import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import "../App.css";

function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //login handler dispatching action to redux store user slice
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        username: username,
        password: password,
        loggedIn: true,
      })
    );
  };

  return (
    <div className="login-form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="avatar">
          <i className="material-icons">&#xE7FF;</i>
        </div>
        <h4 className="modal-title">Login to Your Account</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required="required"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-block btn-lg"
          value="Login"
        />
      </form>
    </div>
  );
}

export default LoginPage;
