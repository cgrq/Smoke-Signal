import "./Nav.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import lottie from "lottie-web";
import { logout } from "../../store/session";
import OpenLandingPageModalButton from "../OpenLandingPageModalButton";
import LoginFormModal from "../LoginFormModal";
import UserFormModal from "../UserFormModal";
import animationData from "./smoke-signal.json";
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
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
      setAnimationInstance(newAnimationInstance);
    }
  }, [animationContainer, animationInstance]);

  const aStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  };

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
        <p className="splash-page-p">
          A site to <span className="verbs">engage</span>,{" "}
          <span className="verbs">interact</span>, and{" "}
          <span className="verbs">communicate</span> with others in a
          collaborative way.
        </p>
      </div>
      <div className="yeet">
        <SmokeSignalSplash />
      </div>
      <div className="footer">
        <a
          href="https://www.linkedin.com/in/vincent-radford-1a9599173/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...aStyle,
          }}
        >
          <i style={{ marginRight: "5px" }} className="fa-brands fa-linkedin" />
          Vincent Radford
        </a>
        <a
          href="https://www.linkedin.com/in/roosevelt-burden-83982026b/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...aStyle,
          }}
        >
          <i style={{ marginRight: "5px" }} className="fa-brands fa-linkedin" />
          Roosevelt Burden
        </a>
        <a
          href="https://www.linkedin.com/in/c--r/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...aStyle,
          }}
        >
          <i style={{ marginRight: "5px" }} className="fa-brands fa-linkedin" />
          Christian Rosa
        </a>
        <a
          href="https://www.linkedin.com/in/adam-tull-a54207a6/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...aStyle,
          }}
        >
          <i style={{ marginRight: "5px" }} className="fa-brands fa-linkedin" />
          Adam Tull
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/cgrq/Smoke-Signal"
        >
          <i className="fa-brands fa-github" />
        </a>
        <p>@2023</p>
      </div>
    </>
  );
}
export default Nav;
