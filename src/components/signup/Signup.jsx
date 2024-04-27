import React, { useState } from 'react';
import styles from './Signup.module.css';
import { userSignup } from '../../utils/userApi';
import {ToastContainer,toast} from "react-toastify"
import {useNavigate,Link} from "react-router-dom"

const toastOption={
  position:"top-right",
  autoClose:5000,
  hideProgressBar:false,
  closeOnClick:true,
  pauseOnHover:true,
  draggable:true,
  progress:undefined,
  theme:"colored",
}
const Signup = () => {
  const navigate = useNavigate();
  const [loading,setLogin]=useState(false)
  // State variables for form inputs and errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  //validation for a input filed
  // Validate name
if (formData.name === '') {
  setErrors({
    ...errors,
    name: 'Please enter your name'
  });
  return;
}

// Validate email
if (formData.email === '') {
  setErrors({
    ...errors,
    email: 'Please enter your email'
  });
  return;
} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  setErrors({
    ...errors,
    email: 'Please enter a valid email address'
  });
  return;
}

// Validate password
if (formData.password === '') {
  setErrors({
    ...errors,
    password: 'Please enter your password'
  });
  return;
} else if (formData.password.length !== 8) {
  setErrors({
    ...errors,
    password: 'Password must be 8 characters long'
  });
  return;
}

// Validate confirm password
if (formData.confirmPassword === '') {
  setErrors({
    ...errors,
    confirmPassword: 'Please confirm your password'
  });
  return;
} else if (formData.password !== formData.confirmPassword) {
  setErrors({
    ...errors,
    confirmPassword: 'Passwords do not match'
  });
  return;
}

// If all validations passed, clear all errors
setErrors({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

    // If all validations pass, you can submit the form data to the server
    setLogin(true)
    userSignup(formData).then((res) => {
      toast.success(res.data.message,toastOption)
      setLogin(false)
    }).catch((err) =>{
      setLogin(false)
      toast.error(err.response.data.message,toastOption)
      return false;
    }).finally(()=>{
    window.refresh()
    })
    
  };

  return (
    <div className={styles.signupContainer}>
      <ToastContainer/>
      <div className={styles.formContainer}>
      <h2>User Signup</h2>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Enter your name'
            value={formData.name}
            onChange={handleChange}
          />
          {/* Display error message if name is empty */}
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
          />
          {/* Display error message if email is empty or invalid */}
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
          />
          {/* Display error message if password is empty */}
          {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder='Confirm your password'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {/* Display error message if passwords don't match */}
          {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
        </div>
        <button type="submit" className={styles.signupButton}>
          {
            loading ? "Loading...":"Signup"
          }
        </button>
        <div className={styles.signupText} >
          Already have an account? <Link to="/" className={styles.loginLink}>Login</Link>
        </div>
      </form>
      </div>
      </div>
  );
};

export default Signup;
