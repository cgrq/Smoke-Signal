import "./Nav.css"
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import lottie from 'lottie-web';
import { logout } from "../../store/session";
import OpenLandingPageModalButton from "../OpenLandingPageModalButton";
import LoginFormModal from "../LoginFormModal";
import UserFormModal from "../UserFormModal";
import animationData from "./smoke-signal.json"
import SmokeSignalSplash from "../SmokeSignalSplash";

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
    <>
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
      <div className="splash-page-body">
        <h1>Welcome to Smoke Signal!</h1>
        <p className="splash-page-p">A site to <span className="verbs">engage</span>, <span className="verbs">interact</span>, and <span className="verbs">communicate</span> with others in a collaborative way.</p>
      </div>
      <div className="yeet">
          <SmokeSignalSplash />
        </div>
      <div className="footer">
        <p>Vincent Radford</p>
        <p>Roosevelt Burden</p>
        <p>Christian Rosa</p>
        <p>Adam Tull</p>
        <p>@2023</p>
      </div>
    </>
  )
}
export default Nav
