import React, { useState } from "react";
import InputItem from "./components/inputItem";

function App() {
  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",
  });

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(loginForm);
  };

  return (
    <div>
      <h1>LDAP Login</h1>

      <form>
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
    </div>
  );
}

export default App;
