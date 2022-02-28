import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./nav.css";
const Nav = ({ LoggedIn, setLoggedIn }) => {
  let navigate = useNavigate(''); 
  useEffect(() => {
   sessionStorage.getItem("currentUser") ? setLoggedIn(true) :setLoggedIn(false)
 },[setLoggedIn])
 
  const logoutHandler = () => {
    navigate("/");
    setLoggedIn(false);
    sessionStorage.clear();
    
  };

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">Lunaria</div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
     
        </label>
      </div>

      <div className="nav-links">
        {LoggedIn ? <NavLink to="/home" className="item">  Home </NavLink>:""}

        {LoggedIn ? "" : <NavLink to="/register" className="item">Register</NavLink>}

        {LoggedIn ? (
          <a  className="item" onClick={logoutHandler}> Logout </a>
        ) : (
          <NavLink to="/" className="item"> Login </NavLink>
        )}
      </div>
    </div>
    // </div>
  );
};

export default Nav;
