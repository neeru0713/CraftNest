import React, { useContext } from "react";
import NavBar from "./NavBar";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { UserContext, ModalContext } from "../App";

const LandingPage = () => {
    const { showModal, setShowModal } = useContext(ModalContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  function handleSubmit() {
    if (user) {
      // go to contribute page
  navigate("/contribute");
    } else {
      // show modal
      setShowModal(true)
    }
  }
  return (
    <div className="h-[100vh] w-[100%] landing-page flex flex-col">
      <NavBar handleSubmit={handleSubmit}/>
      <div className="ml-[8rem] mt-[10rem]">
        <p className="text-white font-bold text-6xl w-[50%] mb-6 justify-between ">
          Where creativity finds it's nest
        </p>
        
          <Button
            name="Contribute"
            bgColor="bg-slate-800"
            handleSubmit={handleSubmit}
          />
        
      </div>
    </div>
  );
};

export default LandingPage;
