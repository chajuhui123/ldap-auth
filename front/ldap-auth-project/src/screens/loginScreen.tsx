import React, { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import InputItem from "../components/inputItem";
import { fetchLogin } from "../feature/login/loginFetch";

const LoginScreen = () => {
  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",
  });

  const { mutate: loginMutate } = useMutation(fetchLogin);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginMutate(loginForm);
    console.log(loginForm);
  };

  return (
    <StyledWrapper>
      <form>
        <h1>LDAP LOGIN</h1>

        <InputItem
          type="text"
          label="LDAP ID"
          value={loginForm.id}
          onChange={(e) => {
            setLoginForm({ ...loginForm, id: e.currentTarget.value });
          }}
        />

        <InputItem
          type="password"
          label="LDAP Password"
          value={loginForm.password}
          onChange={(e) => {
            setLoginForm({ ...loginForm, password: e.currentTarget.value });
          }}
        />

        <button onClick={handleLogin}>Login</button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  h1 {
    margin: 0 0 4rem 0;
  }

  form {
    text-align: center;
  }
  button {
    background-color: black;
    border: none;
    color: white;
    padding: 0.8rem 5rem;
    margin: 1rem 0 0 0;
  }
`;

export default LoginScreen;
