import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginComponent.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducer/userSlice";
import GoogleButton from "react-google-button";
import { auth, provider } from "../../Configs/Firebase/firebase.configs";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginComponent = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  //hanlde Input Value
  const handleInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  //Xử lý đăng nhập
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginValue = inputValue;
      await dispatch(login(loginValue)).unwrap();
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
    }
  };

  const [user] = useAuthState(auth);
  //Xử lý đăng nhập google
  const handleLoginByGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      const { user } = result;
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("login-user");
  }, []);

  return (
    <div className="login">
      <div className="login-top">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="r-k200y r-1cvl2hr r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-kzbkwu r-bnwqim r-1plcrui r-lrvibr"
        >
          <g>
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
          </g>
        </svg>
      </div>
      <h3>LOGIN WITH YOUR ACCOUNT</h3>
      <form className="login-form" method="post" onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            id="login-email"
            name="email"
            onChange={handleInput}
          />
          <label htmlFor="login-email">
            Email <sup className="text-danger">*</sup>
          </label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="login-password"
            name="password"
            onChange={handleInput}
          />
          <label htmlFor="login-password">
            Password <sup className="text-danger">*</sup>
          </label>
        </div>
        <input type="submit" className="btn btn-primary" value="Log in" />
      </form>
      <div className="separator">
        <div className="line" />
        <h5>or</h5>
        <div className="line" />
      </div>

      <GoogleButton className="google_btn" onClick={handleLoginByGoogle} />

      <h5>
        Don't Have you account?
        <Link to={"/register"} className="signin_btn mx-1">
          Register
        </Link>
      </h5>
    </div>
  );
};

export default LoginComponent;
