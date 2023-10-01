import "./App.css";
// import {io} from "socket.io-client"
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contribute } from "./components/Contribute";
import React, { useState, useEffect } from "react";

function App({ socket }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("craftnest_user"));
    console.log(myuser);
    if (myuser) {
      setUser(myuser)
    }
  }, [])
  // function clickHandler() {
  //   // let socket = io('http://localhost:8080')
  //   // console.log("button clicked", socket);
  //   socket.emit("custom", "hey", "7DytMZxQ8m7Z4WSoAAAJ");
  //   socket.emit("join-room", "Test")
  //   // socket.emit("Ritish", 23, "apple employee");
  //   // socket.emit("message", "ousbdivsbv")
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />

        <Route path="contribute" element={<Contribute user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
