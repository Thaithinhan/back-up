import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/HomePage/Homepage";
import Register from "./Pages/Register/Register";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MainPage from "./Pages/MainPage/MainPage";
import Notification from "./Pages/Notification/Notification";
import Message from "./Pages/Message/Message";
// import ProfilePage from "./Pages/ProfilePage/MyProfile";
import PostDetail from "./Pages/PostDetail/PostDetail";
import MyProfilePage from "./Pages/ProfilePage/MyProfile";
import VerifyPage from "./Pages/VerifyPage/VerifyPage";
import { io } from "socket.io-client";
import { useEffect } from "react";
import RequireAuth from "./Components/RequireAuth";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:4000");
    console.log(socket);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Homepage />} />

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<MainPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/notifications" element={<Notification />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/messages" element={<Message />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/my-profile" element={<MyProfilePage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/profile/:id" element={<MyProfilePage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/post-detail/:id" element={<PostDetail />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/verify/:id" element={<VerifyPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
