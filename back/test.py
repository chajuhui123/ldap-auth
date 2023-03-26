import ldap

def authenticate(ldap_object, ldap_address, user_name, password):
    try:
        print(ldap_object.simple_bind_s(user_name, password))
    except ldap.INVALID_CREDENTIALS:
       ldap_object.unbind()
       return 'Wrong username ili password'
    except Exception as e:
        print(e)
        return "error"

    return "Succesfully authenticated"


def initialize_ldap(ldap_address):
    ldap_object = ldap.initialize(ldap_address)
    
    return ldap_object


def main():
    ldap_address = "ldap://" # {address}
    user_name = "insert your email"
    password = "insert your password"

    ldap_object = initialize_ldap(ldap_address)
    print(authenticate(ldap_object, ldap_address, user_name, password))


if __name__ == '__main__':
    main()