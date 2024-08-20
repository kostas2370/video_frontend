import React  from "react";
import {
  Route,
  Routes,
  useLocation,
  useParams 
} from "react-router-dom";

import Login from "./components/LoginPage";
import Home from "./components/HomePage"
import Register from "./components/RegisterPage";
import Navbar from "./components/general/myNavBar";
import Twitch from "./components/TwitchPage";
import { Avatar } from "./components/AvatarPage";
import { Videos } from "./components/VideosPage";
import useAuth from "./useAuth";
import { Video } from "./components/VideoPage";
function App() {

  useAuth()
  const location = useLocation();
  let { videoId } = useParams();

  
  const shouldShowNavbar =
    location.pathname !== "/login/" && location.pathname !== "/register";

  return (
    <div className="">
      {shouldShowNavbar ? <Navbar /> : <></>}

      <Routes class="w-screen">
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/twitch/" element={<Twitch />} />
        <Route path="/avatars/" element={<Avatar />} />
        <Route path="/videos/" element={<Videos />} />
        <Route path="/videos/:videoId/" element={<Video/>} />




        <Route path="/" element={<Home />} />
        <Route path="*" element={<>Not found</>} />

      </Routes>
    </div>
  );
}

export default App;
