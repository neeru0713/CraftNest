import "./App.css";
import { io } from "socket.io-client";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contribute } from "./components/Contribute";
import { AdminView } from "./components/AdminView";
import { ProjectDetail } from "./components/ProjectDetail";
import {LiveChat} from "./components/LiveChat"

import React, { useState, useEffect, createContext } from "react";
import { API_URL } from "./config/config";

export const UserContext = createContext();
export const ModalContext = createContext();
export const SocketContext = createContext();
export const CreatorContext = createContext();
export const ShowChatBoxContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [socket, setSocket] = useState({});
  const [creator, setCreator] = useState({});
  const [showChatBox, setShowChatBox] = useState(false);

  useEffect(() => {
    console.log("use effect 1");
    const s = io(API_URL);
    setSocket(s);
  }, []);

  // repopulate user context on page refresh
  useEffect(() => {
    let user = localStorage.getItem("craftnest_user");
    if (user) {
      let userObj = JSON.parse(user);
      setUser(userObj);
    }
  }, []);

  useEffect(() => {
    console.log("use effect 2", socket);
    // This code will run whenever the 'socket' state changes
    if (Object.keys(socket).length > 0 && socket.connected) {
      let user = localStorage.getItem("craftnest_user");
      console.log(user);
      if (user) {
        user = JSON.parse(user);
        console.log(socket?.id);
        user.socketId = socket?.id;

        localStorage.setItem("craftnest_user", JSON.stringify(user));
        if (user) {
          setUser(user);
          // Send a request to the server to save socket id in the user model
          socket.emit("save-socket-id", { userId: user._id });
          console.log(user._id)
        }
      }
    }
  }, [socket]); // Add 'socket' to the dependency array

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
          <SocketContext.Provider value={{ socket, setSocket }}>
            <CreatorContext.Provider value={{ creator, setCreator }}>
              <ShowChatBoxContext.Provider
                value={{ showChatBox, setShowChatBox }}
              >
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="contribute" element={<Contribute />} />
                  <Route
                    path="/projects/:category"
                    element={<ProjectDetail />}
                  />
                  <Route path="/admin/manage" element={<AdminView />} />
                  <Route path="/liveChat" element={<LiveChat />} />


                </Routes>
              </ShowChatBoxContext.Provider>
            </CreatorContext.Provider>
          </SocketContext.Provider>
        </ModalContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;








// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');

// const App = () => {
//     // State variables
//     const [modalOpen, setModalOpen] = useState(false);
//     const [email, setEmail] = useState('');
//     const [chattingWith, setChattingWith] = useState(null);
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     // Effect for handling chat messages
//     useEffect(() => {
//         socket.on('chat message', (data) => {
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });
//     }, []);

//     // Function to handle chat requests
//     const handleChatRequest = (receiverEmail) => {
//         // Send chat request logic
//         socket.emit('chat request', { sender: 'sender@example.com', receiver: receiverEmail });
//     };

//     // Function to handle accepting chat requests
//     const handleAcceptChat = (senderEmail) => {
//         // Handle accepted chat logic
//         socket.emit('accept chat', { sender: senderEmail, receiver: 'receiver@example.com' });
//         setChattingWith(senderEmail);
//     };

//     // Function to handle sending chat messages
//     const handleSendMessage = () => {
//         // Handle sending messages logic
//         socket.emit('chat message', { sender: 'sender@example.com', receiver: chattingWith, message });
//         setMessage('');  
//     };

//     return (
//         <div>
//             {/* UI components for live chat button, modal, and chat interface */}
//         </div>
//     );
// };

// export default App;
