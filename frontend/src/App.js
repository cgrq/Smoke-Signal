import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { getAllTeamsThunk } from "./store/teams";
import LandingPage from "./components/LandingPage";
import ChatInterface from "./components/ChatInterface";
import Error404 from "./components/Error404";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.session);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTeamsThunk());
  }, [user]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path={"/"}>
            {
              // If user is logged in...
              user ? (
                // display Chat Interface
                <ChatInterface isLoaded={isLoaded} />
              ) : (
                // If they are logged out...
                // display Landing Page
                <LandingPage />
              )
            }
          </Route>

          <Route>
            <Error404 />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
