import "./Nav.css"
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import lottie from 'lottie-web';
import { logout } from "../../store/session";
import OpenLandingPageModalButton from "../OpenLandingPageModalButton";
import LoginFormModal from "../LoginFormModal";
import UserFormModal from "../UserFormModal";
import animationData from "./smoke-signal.json"

function Nav() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [animationInstance, setAnimationInstance] = useState(null);
  const animationContainer = useRef(null);
  const ulRef = useRef();

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

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (animationContainer.current && !animationInstance) {
      const newAnimationInstance = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
      setAnimationInstance(newAnimationInstance);
    }
  }, [animationContainer, animationInstance]);

  return (
    <div className="landing-page-nav-wrapper">
      <div className="landing-page-logo-wrapper">
        <div className="landing-page-smoke-signal" ref={animationContainer} />
      </div>
      <div>
        <OpenLandingPageModalButton
          fillBackground={true}
          buttonText="Sign Up"
          onItemClick={closeMenu}
          modalComponent={<UserFormModal />}
        />
        <OpenLandingPageModalButton
          buttonText="Log In"
          onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
      </div>
    </div>
  )
}
export default Nav
