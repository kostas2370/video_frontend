import React  from "react";
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Login from "./components/LoginPage";
import Home from "./components/HomePage"
import Register from "./components/RegisterPage";
import Navbar from "./components/general/myNavBar";
import Twitch from "./components/TwitchPage";
import { Avatar } from "./components/AvatarPage";
function App() {
  const location = useLocation();

  const shouldShowNavbar =
    location.pathname !== "/login/" && location.pathname !== "/register";

  return (
    <div className="">
      {shouldShowNavbar ? <Navbar /> : <></>}

      <Routes class="w-screen">
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/twitch" element={<Twitch />} />
        <Route path="/avatars" element={<Avatar />} />



        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
