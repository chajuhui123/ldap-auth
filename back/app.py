from flask import Flask, url_for
from flask_restx import Api, Resource 
from flask_ldap3_login import LDAP3LoginManager

import config


app = Flask(__name__) 
api = Api(app) 

app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['LDAP_HOST'] = config.LDAP_HOST
app.config['LDAP_BASE_DN'] = config.LDAP_BASE_DN
app.config['LDAP_USER_DN'] = config.LDAP_USER_DN
app.config['LDAP_GROUP_DN'] = config.LDAP_GROUP_DN
app.config['LDAP_USER_RDN_ATTR'] = config.LDAP_USER_RDN_ATTR
app.config['LDAP_USER_LOGIN_ATTR'] = config.LDAP_USER_LOGIN_ATTR
app.config['LDAP_BIND_USER_DN'] = config.LDAP_BIND_USER_DN
app.config['LDAP_BIND_USER_PASSWORD'] = config.LDAP_BIND_USER_PASSWORD

ldap_manager = LDAP3LoginManager(app)     

@api.route('/hello')  
class HelloWorld(Resource):
    def get(self): 
        return {"hello": "world!"}

@api.route('/manual_login')
class manual_login(Resource):
    def post(self):
        # Instead of using the form, you can alternatively authenticate
        # using the authenticate method.
        # This WILL NOT fire the save_user() callback defined above.
        # You are responsible for saving your users.
        login = app.ldap3_login_manager.authenticate('username', 'password')
        print(login)
        return {"hello": "world!"}

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=80)