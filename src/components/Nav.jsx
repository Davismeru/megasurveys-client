import React from "react";
import { FaBars } from "react-icons/fa6";
import "../css/Nav.css";
import { base_api_url } from "../assets/constants";

function Nav({ profilePicture }) {
  return (
    <div className="nav_container">
      <img src="/images/logo.png" alt="logo" className="logo" />
      {/* small devices nav */}
      <div>
        <FaBars className="menu_icon" />
        {<img src={`${base_api_url}/${profilePicture}`} alt="" />}
      </div>
    </div>
  );
}

export default Nav;
