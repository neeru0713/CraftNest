import React, { useState, useEffect } from "react";
import Button from "./Button";
import Modal from "./Modal";
import mylogo from "../logo_transparent.png";
const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  function loginHandler() {
    setIsModalOpen(true);
  }
  return (
    <div className=" h-[70px] flex w-[100%] justify-between">
      <img src={mylogo} height="90em" width="100em" />
      <div className=" w-[10%] h-[3rem] flex justify-between mr-[1rem] pt-[1rem]">
        <div>
          <Button name="Explore" />
        </div>
        <div onClick={loginHandler}>
          <Button name="Login" />
        </div>
      </div>

      {isModalOpen ? (
        <div className="overlay">
          <Modal setIsModalOpen={setIsModalOpen} />
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
