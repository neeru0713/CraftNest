import "./App.css";
// import {io} from "socket.io-client"
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contribute } from "./components/Contribute";

function App({ socket }) {
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
          <Route path="/" element={<LandingPage />}/>
          
          <Route path="contribute" element={<Contribute />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
