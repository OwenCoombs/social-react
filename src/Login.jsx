import React, { useContext, useState } from "react";
import { AuthContext } from "./context";
import { getToken } from "./api";
import CreateNewUser from "./CreateNewUser";


function Login() {
  const { auth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    getToken({ auth, username, password });
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="input-group">
        <label className="input-label">Username:</label>
        <input
          type="text"
          className="input-field"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="input-group">
        <label className="input-label">Password:</label>
        <input
          type="password"
          className="input-field"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="button-group">
        <button className="submit-button" onClick={() => submit()}>
          Submit
        </button>
      </div>
      <hr className="divider" />
    </div>
  );
}

export default Login;
