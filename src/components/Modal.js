import React, { useState, useEffect, useRef } from "react";
import photo from "../photography.jpg"
import AuthPage from "./AuthPage";
const Modal = ({ setIsModalOpen }) => {
const [whichAuthPage, setWhichAuthPage] = useState("login");
 const modalRef = useRef(null);
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.keyCode === 27) {
        setIsModalOpen(false);
      }
    };

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleOutsideClick);
    // cleanup function
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={`flex ${
        whichAuthPage === "login" ? "flex-row " : "flex-row-reverse"
      } fixed h-[75%] w-[50%] top-16 left-[27%] justify-center items-center border border-none rounded-lg`}
    >
      <div
        className={`w-[50%] h-[100%] bg-[#f6f8f7] flex flex-col justify-between ${
          whichAuthPage === "login"
            ? "rounded-tl-lg rounded-bl-lg"
            : "rounded-tr-lg rounded-br-lg"
        }`}
      >
        <div className=" m-4 ml-8">
          <h1 className="font-bold text-3xl">Join our community</h1>
          <h1 className="font-bold text-3xl">Collaborate Projects</h1>
          <ul className="text-xl mt-10 font-semibold">
            <li>Professional Projects</li>
            <li>100% free</li>
            <li>Collaborate</li>
          </ul>
        </div>

        <img src={photo} className="h-[50%]" />
      </div>

      <div
        className={`w-[50%] h-[100%] text-black auth-graintant  ${
          whichAuthPage === "login"
            ? "rounded-tr-lg rounded-br-lg"
            : "rounded-tl-lg rounded-bl-lg"
        }`}
      >
        <AuthPage
          togglePage={setWhichAuthPage}
          whichAuthPage={whichAuthPage}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};

export default Modal;
