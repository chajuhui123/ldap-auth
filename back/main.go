package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-ldap/ldap/v3"
	"github.com/gorilla/mux"
)

type Configuration struct {
	BindUsername string `json:"binduser"`
    BindPassword string `json:"bindpass"`
    FQDN         string `json:"fqdn"`
    BaseDN       string `json:"basedn"`
    Filter       string `json:"()"`
	TestUser     string `json:"id"`
	TestPass     string `json:"pass"`
}

// var users = map[string]*User{}

// type User struct {
// 	Nickname string `json:"nickname"`
// 	Email    string `json:"email"`
// }

type LDAPUser struct {
	Id         string `json:"id"`
	Password   string `json:"pass"`
}

func main() {
	router := mux.NewRouter()

	// config
	config:= LoadConfigration()

	// TLS Connection
    l, err := Connect(config.FQDN)
    if err != nil {
        log.Fatal(err)
    }
    defer l.Close()

	router.HandleFunc("/ldap-search", func(wr http.ResponseWriter, r *http.Request) {
		switch r.Method {
            case http.MethodPost:

				result, err := AuthenticateLDAPUser(l, config.TestUser, config.TestPass)
		
				if err != nil {
					log.Fatal(err)
				}
				json.NewEncoder(wr).Encode(result.Entries[0])
		}
	})

	// 9000 포트에 서버 띄우기.
    http.ListenAndServe(":9000", jsonMiddleware(router))
}

func LoadConfigration() Configuration {
    var config Configuration
    file, err := os.Open("config.json")
    defer file.Close()
    if err != nil {
        fmt.Println(err.Error())
    }
    jsonParser := json.NewDecoder(file)
    jsonParser.Decode(&config)
    return config
}

// Ldap Connection without TLS
func Connect(fqdn string) (*ldap.Conn, error) {
    // You can also use IP instead of FQDN
    l, err := ldap.DialURL(fmt.Sprintf("ldap://%s:389", fqdn))
    if err != nil {
        return nil, err
    }

    return l, nil
}

func jsonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		rw.Header().Add("Content-Type", "application/json") // 헤더 설정
		next.ServeHTTP(rw, r)  // 전달 받은 http.Handler 호출
	})
}

func AuthenticateLDAPUser(l *ldap.Conn, id string, password string)(*ldap.SearchResult, error) {
	// Search for the given username
	searchRequest := ldap.NewSearchRequest(
		"ou=Users,dc=ap-northeast-2,dc=compute,dc=internal",
		ldap.ScopeWholeSubtree,
		ldap.NeverDerefAliases,
		0,
		0,
		false,
		fmt.Sprintf("(&(objectClass=organizationalPerson)(cn=%s))", ldap.EscapeFilter(id)),
		[]string{},
		nil,
	)
	sr, err := l.Search(searchRequest)
	if err != nil {
		log.Fatal(err)
	}

	if len(sr.Entries) != 1 {
		log.Fatal("User does not exist or too many entries returned")
	}

	userdn := sr.Entries[0].DN

	err = l.Bind(userdn, password)
	if err != nil {
		return nil, fmt.Errorf("Search Error: %s", err)
	}


	// Rebind as the read only user for any further queries
	// err = l.Bind(config.BindUsername, config.BindPassword)
	// if err != nil {
	// 	return nil, fmt.Errorf("Search Error: %s", err)
	// }

	return sr, nil
}
