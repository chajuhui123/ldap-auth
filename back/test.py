from flask import Flask, url_for
import ldap
import config

app = Flask(__name__)

def authenticate(ldap_object, ldap_address, user_name, password):
    try:
        print(ldap_object.simple_bind_s(user_name, password))
    except ldap.INVALID_CREDENTIALS:
       ldap_object.unbind()
       return 'Wrong username ili password'
    except Exception as e:
        print(e)
        return "error"

    return "Succesfully authenticated", 200

def initialize_ldap(ldap_address):
    ldap_object = ldap.initialize(ldap_address)
    
    return ldap_object

def main():
    ldap_address = "ldap://{}:{}".format(config.LDAP_HOST, config.LDAP_PORT) # {address}
    user_name = config.LDAP_USERNAME
    password = config.LDAP_PASSWORD

    ldap_object = initialize_ldap(ldap_address)
    print(authenticate(ldap_object, ldap_address, user_name, password))


if __name__ == '__main__':
    main()
