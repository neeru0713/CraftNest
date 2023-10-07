import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import Modal from "./Modal";
import mylogo from "../logo_transparent1.png";
import { Link } from "react-router-dom";
import { UserContext, ModalContext } from "../App";
// import useUser from "../customHooks/useUser"

const NavBar = ({ handleSubmit }) => {
  // const { user, setUser } = useUser();
  const { user, setUser } = useContext(UserContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(getShowLoginValue());

  useEffect(() => {
    console.log("use effevt is called", user);
  }, [user]);

  function loginHandler() {
    // setIsModalOpen(true);
    setShowModal(true)
  }

  function getShowLoginValue() {
    console.log("user in navbar : ", user);
    if (user) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className=" h-[50px] flex w-[100%] justify-between bg-slate-900">
      <div className="flex text-white items-center">
        <Link to="/">
          <img src={mylogo} className="h-[76px]  mt-3" />
        </Link>
        <div className="border border-2 h-[70%] mr-2 -ml-2"></div>
        <div className="font-semibold text-lg">CraftNest</div>
      </div>

      <div className=" w-[8%] h-[40px] flex justify-between mr-[1rem] pt-2 ">
        <div>
          <Button name="Explore" size="small" bgColor="bg-none" />
        </div>
        {!user ? (
          <div onClick={loginHandler}>
            <Button name="Log In" size="small" bgColor="bg-none" />
          </div>
        ) : (
          <div className="border rounded-full bg-slate-400 h-[35px] w-[35px] text-black font-semibold text-center p-1">
            NR
          </div>
        )}
      </div>

      
        
          <Modal
            setIsModalOpen={setIsModalOpen}
            setShowLoginBtn={setShowLoginBtn}
          />
        
      
    </div>
  );
};

export default NavBar;
