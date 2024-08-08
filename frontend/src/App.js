import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/home";
import Register from "./components/Register";
import Navbar from "./components/myNavBar";
import Twitch from "./components/twitch";
function App() {
  const location = useLocation();

  const shouldShowNavbar =
    location.pathname !== "/login/" && location.pathname !== "/register";

  return (
    <>
      {shouldShowNavbar ? <Navbar /> : <></>}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/twitch" element={<Twitch />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
