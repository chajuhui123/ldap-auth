import ldap
import config
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel


class UserInfo(BaseModel):
    user_name: str
    password: str


app = FastAPI()

def initialize_ldap(ldap_address):
    ldap_object = ldap.initialize(ldap_address)
    return ldap_object

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/sign-in")
def authenticate_ldap(userInfo : UserInfo):
    try:
        ldap_object = initialize_ldap(config.LDAP_SERVER)
        print(ldap_object.simple_bind_s(userInfo.user_name, userInfo.password))
    except ldap.INVALID_CREDENTIALS:
       ldap_object.unbind()
       return {"res": "Wrong username ili password"}
    except Exception as e:
        print(e)
        return "error"

    return {"res": "Succesfully authenticated"}