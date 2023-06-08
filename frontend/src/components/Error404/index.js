import "./Error404.css";
import SmokeSignal from "../SmokeSignal";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Error404 = () => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push("/")}
      className="page-not-found"
      style={{ cursor: "pointer" }}
    >
      <h1>404</h1>
      <div className="logo-wrapper">
        <SmokeSignal />
      </div>
      <NavLink to="/">Let's Head Back to the Fire</NavLink>

      <p style={{ textAlign: "center" }}>
        The Page your Looking for is... <br />
        Up in Smoke 🕶️
      </p>
    </div>
  );
};

export default Error404;
