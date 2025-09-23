import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
export default function Navbar() {
  return (
    <>
      <div className="nav">
        <Link to="/">
          <img src={logo} alt="My Website Logo" className="logo" />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/Services">Services</Link>
          </li>
          <li>
            <Link to="/Podfolio">Podfolio</Link>
          </li>
          <li>
            <Link to="/Contacts">Contacts</Link>
          </li>
          <li>
            <Link to="/HireMe">Hire Me</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
