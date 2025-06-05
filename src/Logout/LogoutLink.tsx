import React from "react";
import axios from "axios";

export function Logout() {
  const handleClick = (event) => {
    event.preventDefault()
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt")
    localStorage.removeItem('name')
    window.location.href = '/'
  }

  return (
    <a href="#" onClick={handleClick}>Logout</a>
  )
}

