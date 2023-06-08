import "./SmokeSignal.css";
import React, { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./smoke-signal.json";

function SmokeSignal() {
  const [animationInstance, setAnimationInstance] = useState(null);
  const animationContainer = useRef(null);

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

  return (
    <div className="smoke-signal-wrapper">
      <div className="smoke-signal" ref={animationContainer} />
    </div>
  );
}
export default SmokeSignal;
