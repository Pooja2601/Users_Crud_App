import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg p-3">
      <Link to="/" className="navbar-brand">
        Users Console
        <span className="vl" />
      </Link>
      <div className="collpase navbar-collapse ">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Users
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/createuser" className="nav-link">
              Create User
            </Link>
          </li>
        </ul>
      </div>
      <div className="d-flex justify-content-end">
        <span>
          {" "}
          <h4 style={{ color: "white", marginTop: "10px" }}>
            {`Welcome ${user?.username}`} <span className="vl" />
          </h4>
        </span>
        <button
          type="button"
          className={"btn btn-dark"}
          onClick={(e) => handleLogOut(e)}
        >
          LogOut
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
