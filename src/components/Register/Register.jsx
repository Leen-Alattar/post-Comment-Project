import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import faker from "@faker-js/faker";
import "./register.css";




const Register = ({ LoggedIn, setLoggedIn }) => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    id: Math.random() * 1000,
    image : faker.image.avatar(),
    name: "",
    email: "",
    password: "",
  });

  const setValue = (e) => {
    //   localStorage.clear();
    setErrors([]);
    const name = e.target.name;
    setUser({
      ...user,
      [name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    
    e.preventDefault();
    let isValid = true;
    let errors = {};
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    //User Name Validation
    if (user.name === "") {
      isValid = false;
      errors["name"] = "This field is required!";
    }

    //Email Validation
    if (user.email === "") {
      errors["email"] = "This field is required!";
      isValid = false;
    } else if (!emailRegex.test(user.email)) {
      errors["email"] = "It is not valid email";
      isValid = false;
    }

    if (JSON.parse(localStorage.getItem("users")) !== null) {
      var users = JSON.parse(localStorage.getItem("users"));
      let u = users.filter((u) => {
        if (u.email === user.email) return true;
      });
      if (u.length === 1) {
        errors["email"] = "This email is already token!";
        isValid = false;
      }
    }

    //password Validation
    if (user.password === "") {
      errors["password"] = "This field is required!";
      isValid = false;
    } else if (!passRegex.test(user.password)) {
      errors["password"] = "It should be more than 8 character";
      isValid = false;
    }
    setErrors(errors);

    if (isValid) {
      if (JSON.parse(localStorage.getItem("users")) === null) {
        localStorage.setItem("users", JSON.stringify([user]));
      } else {
        let users = JSON.parse(localStorage.getItem("users"));
        let newUsers = [...users, user];
        localStorage.setItem("users", JSON.stringify(newUsers));
      }
      sessionStorage.setItem("currentUser", JSON.stringify([user]));
    
      setUser({
        name: "",
        email: "",
        password: "",
        image: "",
        id: "",
      });
      setLoggedIn(true);
      navigate("/home");
    }
  };

  return (
    <React.Fragment>
    <main className="login-wrapper">
      <h1 id="heading1">Register</h1>
    <div className="formcontainer">
      <form className="myForm" onSubmit={submitHandler}>
        <div className="input-container">
        <i class="fa-regular fa-user  icon "></i>
          <input
           class="input-field"
           placeholder="User Name"
            type="text"
            name="name"
            value={user.name}
            onChange={setValue}
          />
           </div>
          <span className={errors.name === undefined ? "" : "ui red message"}>
            {errors.name}
          </span>
       
        <div className="input-container">
          <i class="fa fa-envelope icon"></i>
          <input
            class="input-field"
            placeholder="User Email"
            type="email"
            name="email"
            value={user.email}
            onChange={setValue}
          /></div>
          <span className={errors.email === undefined ? "" : "ui red message"}>
            {errors.email}
          </span>
        
        <div className="input-container">
         <i class="fa fa-key icon"></i>
          <input
          class="input-field"
          placeholder="User Password"
            type="password"
            name="password"
            value={user.password}
            onChange={setValue}
            autoComplete="on"
          /></div>
          <span
            className={errors.password === undefined ? "" : "ui red message"}
          >
            {errors.password}
         
        </span>
      
        <button className="bttn" type="submit">
          Register
        </button>
      </form>
    </div>
    </main>
    </React.Fragment>
  );
};
export default Register;
