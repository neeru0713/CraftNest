import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import Modal from "./Modal";

import { Link } from "react-router-dom";
import { UserContext, ModalContext } from "../App";
import { BsFillGearFill } from "react-icons/bs";
// import useUser from "../customHooks/useUser"
import { Popover } from "./Popover.js";

const NavBar = ({ handleSubmit }) => {
  // const { user, setUser } = useUser();
  const { user, setUser } = useContext(UserContext);
  const { showModal, setShowModal } = useContext(ModalContext);

  function loginHandler() {
    // setIsModalOpen(true);
    setShowModal(true);
  }

  return (
    <div className=" h-[50px] flex w-[100%] justify-between  zindex-custom">
      <div className="flex flex-col text-black items-center">
        {/* <Link to="/">
          <img src={mylogo} className="h-[76px]  mt-3" />
        </Link> */}
        {/* <div className="border border-2 h-[70%] mr-2 -ml-2"></div> */}
        <Link to="/">
          <div className="font-semibold brand-name text-white text-4xl ml-4 mt-3 z-4">
            <span className="font-bold text-5xl text-[#4AC1E8]">C</span>raft
            <span className="font-bold text-[#4AC1E8]">N</span>
            est
          </div>
        </Link>

        {/* <img src={mylogo} className="h-[76px] w-[150px] mt-[-20px] z-[-1]" /> */}
      </div>

      <div
        className={`${
          !user ? "w-[14%]" : user?.role === "admin" ? "w-[24%]" : "w-[18%]"
        }   h-[40px] flex justify-between items-center mr-[1rem] mt-2 pt-2 `}
      >
        {user?.role === "admin" && (
          <Link
            to="/admin/manage"
            className="border border-1 border-white text-white flex items-center p-2 bg-[#3998b5] hover:bg-[#16809e] rounded"
          >
            <BsFillGearFill className="" />
            <p className="font-semibold ml-1">Admin</p>
            {/* <Button name="Manage" size="small" className="mb-2" /> */}
          </Link>
        )}

        {/* <Button name="Explore" size="small" bgColor="bg-none" /> */}
        <div className="w-[40%]">
          <Popover />
        </div>

        {user ? (
          <Button
            handleSubmit={() => {
              localStorage.removeItem("craftnest_user");
              setUser(null);
            }}
            size="medium"
            name="Log out"
            className="bg-[#3998b5] border-1 text-white hover:bg-[#16809e]"
          />
        ) : null}

        {/* <select className="w-[70%] border border-white bg-slate-900 text-white font-semibold h-[35px] rounded-md">
          <option>Select</option>
          <option className="p-10" value="Blogs">Blogs</option>
          <option value="Photography">Photography</option>
          <option value="Webdesign">Webdesign</option>
          <option value="Graphicdesign">Graphicdesign</option>
        </select> */}

        {!user ? (
          <div onClick={loginHandler}>
            <Button
              name="Log In"
              size="medium"
              bgColor="bg-none"
              className="bg-[#3998b5] border-1 text-white hover:bg-[#16809e]"
            />
          </div>
        ) : (
          <div className="border rounded-full bg-[#4AC1E8] h-[40px] w-[40px] text-white font-semibold text-center p-1 mt-2 mb-[10px] text-xl">
            {user.email.split("")[0].toUpperCase()}
          </div>
        )}
      </div>

      <Modal />
      {/* <Notification show={showNotification} msg={notifMessage}/> */}
    </div>
  );
};

export default NavBar;
