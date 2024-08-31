import React, { useContext, useState } from "react";
import { FaBars } from "react-icons/fa6";
import "../css/Nav.css";
import { base_api_url } from "../assets/constants";
import { Link, useNavigate } from "react-router-dom";
import { IoMan, IoSwapHorizontal, IoArrowRedo } from "react-icons/io5";

function Nav({ profilePicture, userName, userType }) {
  const navigate = useNavigate();
  const handleSignOut = () => {
    userType == "freelancer"
      ? localStorage.removeItem("freelancerToken")
      : localStorage.removeItem("clientToken");
    navigate("/");
  };

  const [hideMenu, setHideMenu] = useState(true);
  const handleMenu = () => {
    hideMenu ? setHideMenu(false) : setHideMenu(true);
  };

  return (
    <div className="nav_container">
      <Link to="/">
        <img src="/images/logo.png" alt="logo" className="logo" />
      </Link>
      {/* small devices nav */}
      <div>
        <FaBars className="menu_icon" onClick={handleMenu} />
        {<img src={`${base_api_url}/${profilePicture}`} alt="img" />}
      </div>

      {/* nav menu */}
      <section className={!hideMenu ? "nav_menu" : "hide_nav_menu"}>
        {/* logged in as... section */}
        <p className="user_type">Logged in as a {userType}</p>

        {/* profile details section */}
        <p className="nav_username">
          <IoMan />
          {userName}
        </p>

        {/* switch between client and freelancer */}
        <Link
          to={userType == "client" ? "/freelancer" : "/client"}
          className="switch_account cursor-pointer"
        >
          <IoSwapHorizontal />
          Switch to {userType == "client" ? "freelancer" : "client"}
        </Link>

        {/* signout */}
        <p onClick={handleSignOut} className="cursor-pointer">
          <IoArrowRedo />
          Sign out
        </p>
      </section>
    </div>
  );
}

export default Nav;
