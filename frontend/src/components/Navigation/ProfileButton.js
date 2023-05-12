import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import UserFormModal from "../UserFormModal";
import DeleteUserModal from "../DeleteUserModal";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const demoUserIds = [1, 3];

  const openMenu = () => {
    // console.log("profile button push -----------> ", showMenu)
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
  };

  return (
    <div className="profile-container">
      <button className="profile-icon-button clickable" onClick={openMenu}>
        <i className="fas fa-user-circle profile-icon" />
      </button>
      <div
        className={`${
          "profile-dropdown" + (showMenu ? "" : " hidden")
        } profile-list`}
        ref={ulRef}
      >
        <div className={user ? "nav-upper-container" : "hidden"}>
          {user && (
            <>
              <div className="nav-user-name-wrapper">
                <div>Hello, <span className="user-name">{user.first_name}</span></div>
                <div className="nav-user-email">{user.email}</div>
              </div>
              <img className="nav-user-img" src={user.profile_image_url}></img>
            </>
          )}
        </div>
        <div
          className={`nav-lower-container nav-links ${
            !user ? `nav-lower-container-logged-out` : ""
          }`}
        >
          {user && !demoUserIds.includes(user.id) && (
            <div>
              <OpenModalButton
                fillBackground={false}
                buttonText="Edit"
                onButtonClick={closeMenu}
                modalComponent={<UserFormModal componentType={"update"} />}
              />
              <OpenModalButton
                fillBackground={false}
                buttonText="Delete"
                onButtonClick={closeMenu}
                modalComponent={<DeleteUserModal />}
              />
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
          {demoUserIds.includes(user.id) && (
            <>
              <p className="demo-error-message">*This demo user can't be edited/deleted</p>
              <button onClick={handleLogout}>Log Out</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
