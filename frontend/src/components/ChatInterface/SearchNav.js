import ProfileButton from "../Navigation/ProfileButton";
import { logout } from "../../store/session";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function SearchNav({isLoaded, sessionUser}) {
  const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };
    const closeMenu = () => setShowMenu(false);
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(logout());
    };

    return (
        <div className="chat-interface-top-nav">
            <div>

            </div>
            <input onClick={()=>alert("Search and join teams feature coming soon")}/>
            <div>
                {isLoaded && (
                    <ProfileButton user={sessionUser} />
                )}
            </div>
        </div>
    )
}
export default SearchNav
