import React, { useState } from "react";
import { createUser } from "./api";
import { useNavigate } from "react-router-dom";

const CreateNewUser = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const submit = async () => {
    try {
      // Call createUser function and wait for it to finish
      await createUser({ username, password, firstName, lastName });
      
      // Navigate to the login page after successful user creation
      navigate("/login");
    } catch (error) {
      // Handle error if createUser fails
      console.error("Error creating user:", error);
    }
  };
  

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create New User</h1>
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
      <div className="input-group">
        <label className="input-label">First Name:</label>
        <input
          type="text"
          className="input-field"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
      </div>
      <div className="input-group">
        <label className="input-label">Last Name:</label>
        <input
          type="text"
          className="input-field"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
      </div>
      <div className="button-group">
        <button className="submit-button" onClick={() => submit()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateNewUser;
