import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function Logout() {
  const navigate = useNavigate();
  const { setUserId, setName } = useContext(UserContext);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();

    // 1. Clear React context
    setUserId(undefined);
    setName("");

    // 2. Remove Axios auth header
    delete axios.defaults.headers.common["Authorization"];

    // 3. Remove the exact same key your context reads
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");  // <-- same key

    // 4. Navigate home
    navigate("/");
  };

  return <a href="#" onClick={handleClick}>Logout</a>;
}
