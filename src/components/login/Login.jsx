import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { userLogin } from '../../utils/userApi';
import { ToastContainer, toast } from 'react-toastify';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const toastOption = {
  // Toast configuration options
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const Login = () => {
  const dispatch = useDispatch();
  const [loading,setLogin]=useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onChangeHandler = (e) => {
    // Update state with input changes
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordMinLength = 8;

    // Validate email
    if (!loginData.email || loginData.email.trim() === "") {
      setEmailError("Email is required!");
      return false;
    } else if (!emailRegex.test(loginData.email)) {
      setEmailError("Invalid email format!");
      return false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!loginData.password || loginData.password.length < passwordMinLength || 
      loginData.password.length > passwordMinLength 
    ) {
      setPasswordError(`Password must be at least ${passwordMinLength} characters long!`);
      return false;
    } else {
      setPasswordError("");
    }

    // Dispatch login start action
    dispatch(loginStart());

    // Perform login API call
    setLogin(true)
    userLogin(loginData)
      .then((res) => {
        // Display success message
        toast.success(res.data.message, toastOption);

        // Dispatch login success action
        dispatch(loginSuccess(res.data.user));

        // Store token in local storage
        localStorage.setItem("token", res.data.token);
        setLogin(false)
        // Redirect to home page after successful login
        window.location.href = "/";
      })
      .catch((error) => {
        // Dispatch login failure action
        dispatch(loginFailure());
        setLogin(false)
        // Display error message
        toast.error(error.response.data.message, toastOption);
      });
  };

  return (
    <div className={styles["login-container"]}>
      <ToastContainer />
      <div className={styles["login-form-container"]}>
        <h2>User Login</h2>
        <form className={styles["login-form"]} onSubmit={onSubmitHandler}>
          {/* Email input */}
          <div className={styles["input-groups"]}>
            <label htmlFor="email">Email<sup>*</sup> </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              id="email"
              value={loginData.email}
              onChange={onChangeHandler}
            />
            {emailError && <span className={styles["error-message"]}>{emailError}</span>}
          </div>
          {/* Password input */}
          <div className={styles["input-groups"]}>
            <label htmlFor="password">Password<sup>*</sup></label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              id="password"
              value={loginData.password}
              onChange={onChangeHandler}
            />
            {passwordError && <span className={styles["error-message"]}>{passwordError}</span>}
          </div>
          {/* Forgot password link */}
          <div className={styles["forgot-password"]}>
            <Link to="#" className={styles["forgot-password-link"]}>Forget Password? </Link>
          </div>
          {/* Login button */}
          <button type="submit" className={styles["login-btn"]}>
          {
            loading ? "Loading...":"Login"
          }
          </button>
          {/* Register link */}
          <div className={styles["login-register"]}>
            <p className={styles["text"]}>Don't have an account? <Link to="/signup" className={styles["register-link"]}>Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
