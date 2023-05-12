import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import ErrorHandler from "../ErrorHandler";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const loginDemoOne = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  }

  const loginDemoTwo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("lstatton1@earthlink.net", "lXJpkz9"));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  }

  return (
    <>
      <h1 className="log-in-modal-h1">Login</h1>
      <form className="log-in-modal-form" onSubmit={handleSubmit}>
          {Object.values(errors).length > 0 && (
                <ErrorHandler errors={errors} />
              )}
        <div>
          <label>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-modal-button" type="submit">Log In</button>
      </form>
      <hr></hr>
      <div>
        <button className="login-modal-button login-modal-demo-button" onClick={loginDemoOne}>
          Demo User-1
        </button>
        <button className="login-modal-button login-modal-demo-button" onClick={loginDemoTwo}>
          Demo User-2
        </button>
      </div>
    </>
  );
}

export default LoginFormModal;
