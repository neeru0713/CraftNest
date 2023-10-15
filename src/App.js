import "./App.css";
// import {io} from "socket.io-client"
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contribute } from "./components/Contribute";
import { AdminView } from "./components/AdminView";
import { ProjectDetail } from "./components/ProjectDetail";

import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext();
export const ModalContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("craftnest_user"));
    
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
      <UserContext.Provider value={{ user, setUser }}>
        <ModalContext.Provider value={{ showModal, setShowModal }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="contribute" element={<Contribute />} />
            <Route path="/projects/:category" element={<ProjectDetail />} />
            <Route path="/admin/manage" element={<AdminView />} />
          </Routes>
        </ModalContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
