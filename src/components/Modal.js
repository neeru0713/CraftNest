import React, { useState, useEffect, useRef, useContext } from "react";
import photo from "../photography.jpg";
import AuthPage from "./AuthPage";
import { ModalContext } from "../App";

const Modal = () => {
  const { showModal, setShowModal } = useContext(ModalContext);

  const [whichAuthPage, setWhichAuthPage] = useState("login");
  const modalRef = useRef(null);
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.keyCode === 27) {
        setShowModal(false);
      }
    };

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
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
    <>
      {showModal ? (
        <div className="overlay">
          <div
            ref={modalRef}
            className={`flex ${
              whichAuthPage === "login" ? "flex-row " : "flex-row-reverse"
            } fixed h-[55%] w-[50%] top-[20%] text-[#243B55] left-[27%] justify-center items-center border border-none rounded-lg`}
          >
            <div
              className={`w-[50%] h-[100%] bg-[#f6f8f7] flex flex-col justify-between ${
                whichAuthPage === "login"
                  ? "rounded-tl-lg rounded-bl-lg"
                  : "rounded-tr-lg rounded-br-lg"
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1691036562463-a44e242a8ec8?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-[100%]"
              />
            </div>

            <div
              className={`w-[50%] h-[100%] text-white bg-[#4F597C]  ${
                whichAuthPage === "login"
                  ? "rounded-tr-lg rounded-br-lg"
                  : "rounded-tl-lg rounded-bl-lg"
              }`}
            >
              <AuthPage
                togglePage={setWhichAuthPage}
                whichAuthPage={whichAuthPage}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
