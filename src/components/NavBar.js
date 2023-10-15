import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import Modal from "./Modal";
import mylogo from "../logo_transparent1.png";
import { Link } from "react-router-dom";
import { UserContext, ModalContext } from "../App";
// import useUser from "../customHooks/useUser"
import {Popover} from "./Popover.js"

const NavBar = ({ handleSubmit }) => {
  // const { user, setUser } = useUser();
  const { user, setUser } = useContext(UserContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  
  function loginHandler() {
    // setIsModalOpen(true);
    setShowModal(true)
  }



  return (
    <div className=" h-[50px] flex w-[100%] justify-between bg-teal-950 fixed top-0 zindex-custom">
      <div className="flex text-white items-center">
        <Link to="/">
          <img src={mylogo} className="h-[76px]  mt-3" />
        </Link>
        <div className="border border-2 h-[70%] mr-2 -ml-2"></div>
        <div className="font-semibold text-lg">CraftNest</div>
      </div>

      <div
        className={`${
          !user ? "w-[13%]" : "w-[21%]"
        }  h-[40px] flex justify-between items-center mr-[1rem] mt-2 pt-2 `}
      >
        {user?.role === "admin" && (
          <Link to="/admin/manage">
            <Button name="Manage" size="small" className="mb-2" />
          </Link>
        )}

        {/* <Button name="Explore" size="small" bgColor="bg-none" /> */}
        <div className="">
          <Popover />
        </div>

        {user ? (
          <Button
            handleSubmit={() => {
              localStorage.removeItem("craftnest_user");
              setUser(null);
            }}
            name="Log out"
            hoverBg="bg-teal-500"
            size="small"
            bgColor="bg-none"
            className="mb-2 mr-3 hover:bg-teal-600"
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
              size="small"
              bgColor="bg-none"
              className="mb-2 hover:bg-teal-600"
            />
          </div>
        ) : (
          <div className="border rounded-full gradient-username h-[38px] w-[40px] text-white font-semibold text-center mb-[10px] pt-[8px] text-sm">
            NR
          </div>
        )}
      </div>

      <Modal />
    </div>
  );
};

export default NavBar;
