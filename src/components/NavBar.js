import React, { useState, useEffect, useContext, useRef } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { UserContext, ModalContext } from "../App";
import { BsFillGearFill } from "react-icons/bs";
// import useUser from "../customHooks/useUser"
import { Popover } from "./Popover.js";

const NavBar = ({ handleSubmit }) => {
  const popoverRef = useRef(null);
  // const { user, setUser } = useUser();
  const { user, setUser } = useContext(UserContext);
  const userMenuRef = useRef(false);
  const [userMenuList, setUserMenuList] = useState([
    {
      label: "Dashboard",
      actionType: "link",
      routeLink: "/user/dashboard",
    },
    {
      label: "AdminMode",
      actionType: "link",
      routeLink: "/admin/manage",
    },
    {
      label: "LogOut",
      actionType: "button",
      routeLink: null,
    },
  ]);
  const { showModal, setShowModal } = useContext(ModalContext);

  const [isClickedIcon, setIsClickedIcon] = useState(false);
  const [hoverItem, setHoverItem] = useState("");
  const navigate = useNavigate();

  function loginHandler() {
    // setIsModalOpen(true);
    setShowModal(true);
  }

  function handleUserClickIcon() {
    setIsClickedIcon(true);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsClickedIcon(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSubmit() {
    console.log(user);
    if (user) {
      navigate("/liveChat");
    } else {
      alert("user is not login");
    }
  }

  function userClickHandlerMenu(index) {
    if(userMenuList[index].label === "LogOut"){
      localStorage.setItem("craftnest_user", "")
      setUser("")
    }
  }

  const handleHover = (event, val) => {
    if (val === true) {
      setHoverItem(event.target.innerText);
    } else {
      setHoverItem();
    }
  };

  return (
    <div className=" h-[50px] flex w-[100%] justify-between  zindex-custom ">
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

      <button className="flex items-center gap-2 bg-white text-black absolute bottom-10 text-xl right-10 px-4 py-3 hover:bg-gray-100 rounded-md font-semibold">
        <div className="h-3 w-3 bg-green-600 rounded-full"></div>
        <p onClick={handleSubmit}>Live Chat</p>
      </button>

      <div
        className={`w-[18%] h-[40px] flex justify-evenly items-center mr-[1rem] mt-2 pt-2 `}
      >
        {/* <Button name="Explore" size="small" bgColor="bg-none" /> */}
        <div className="w-[40%]">
          <Popover />
        </div>

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
          <>
            <div
              onClick={handleUserClickIcon}
              className="border rounded-full bg-[#4AC1E8] h-[40px] w-[40px] text-white font-semibold text-center p-1 mt-2 mb-[10px] text-xl relative cursor-pointer"
            >
              {user.email.split("")[0].toUpperCase()}
            </div>
            {isClickedIcon ? (
              <ul
                ref={userMenuRef}
                className="flex flex-col absolute right-4 top-14 rounded-lg bg-[#383838] text-white font-semibold cursor-pointer"
              >
                {userMenuList?.map((item, index) => (
                  <li
                    className={`px-5 py-2 rounded-lg ${
                      item.label === hoverItem ? "bg-[#545454]" : ""
                    }`}
                    key={index}
                    onMouseEnter={(event) => handleHover(event, true)}
                    onMouseLeave={(event) => handleHover(event, false)}
                  >
                    {item.actionType === "button" ? (
                      <div onClick={() => { userClickHandlerMenu(index) }}>{item.label}</div>
                    ) : (
                      <Link to={item.routeLink}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
           
          </>
        )}
      </div>

      <Modal />
      {/* <Notification show={showNotification} msg={notifMessage}/> */}
    </div>
  );
};

export default NavBar;
