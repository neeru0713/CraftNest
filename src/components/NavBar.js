import React, { useState, useEffect } from "react";
import Button from "./Button";
import Modal from "./Modal";
import mylogo from "../logo_transparent1.png";
import {Link} from "react-router-dom"
const NavBar = ({user}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginBtn, setShowLoginBtn] = useState(getShowLoginValue());

  function loginHandler() {
    setIsModalOpen(true);
  }

  function getShowLoginValue() {
    if (user?.email) {
      return false
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
        {showLoginBtn ? (
          <div onClick={loginHandler}>
            <Button name="Log In" size="small" bgColor="bg-none" />
          </div>
        ) : (
          <div>0</div>
        )}
      </div>

      {isModalOpen ? (
        <div className="overlay">
          <Modal
            setIsModalOpen={setIsModalOpen}
            setShowLoginBtn={setShowLoginBtn}
          />
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
