import React, { useContext, useRef } from "react";
import NavBar from "./NavBar";
import Button from "./Button";
import newbg from "../newbg.jpg";
import { useNavigate } from "react-router-dom";

import { UserContext, ModalContext } from "../App";
import { Box } from "./Box";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  AiOutlineCheckCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";

const LandingPage = () => {
  const downArrowRef = useRef(null);
  const { showModal, setShowModal } = useContext(ModalContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit() {
    if (user) {
      // go to contribute page
      navigate("/contribute");
    } else {
      // show modal
      setShowModal(true);
    }
  }

  const handlearrowDownClick = (e) => {
    if (downArrowRef.current) {
      downArrowRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page-container flex flex-col">
      <MdOutlineKeyboardArrowDown
        onClick={handlearrowDownClick}
        className="cursor-pointer absolute text-white h-[70px] w-[70px] top-[46%] left-[50%] landing-page-arrow"
      />
      <div className="h-[50%] w-full">
        <div className="bg-[#f7fdff] landing-image"></div>
        <div className="black-sheet z-[-1]">
          <NavBar handleSubmit={handleSubmit} />
          <div className="w-full text-center mt-[10rem] landing-page-content">
            <p className="text-6xl highlight font-bold text-white w-[100%] mb-6 justify-between ">
              A place where <span className="underline ">creativity</span> finds
              it's nest
            </p>
            <p className="text-6xl highlight font-bold text-white w-[100%] mb-6 justify-between ">
              Join craftnest and unleash your hidden{" "}
              <span className="underline ">potential</span>
            </p>

            <Button
              name="Contribute"
              handleSubmit={handleSubmit}
              className="bg-green-900 ml-[40%] mt-20 border-1 text-xl text-white hover:bg-green-800"
            />
          </div>
        </div>
      </div>

      <div ref={downArrowRef} className="categories bg-[#F0FDF6] h-[28%]">
        <h1 className="text-black text-left pl-10 text-5xl font-bold category-heading pt-6">
          Explore a World of <span className="underline">Genres!</span>
        </h1>
        <div className="pt-6 flex justify-evenly w-[100%]">
          <Box
            name="Photography"
            image={newbg}
            src="https://images.unsplash.com/photo-1552233707-a3185320d9a0?auto=format&fit=crop&q=80&w=3387&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Box
            name="Writing"
            image={newbg}
            src="https://images.unsplash.com/photo-1588243291559-c4a0c36bc2dc?auto=format&fit=crop&q=80&w=2937&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Box
            name="Web Design"
            image={newbg}
            src="https://images.unsplash.com/photo-1585229259255-9f0816d671a3?auto=format&fit=crop&q=80&w=3377&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Box
            name="Graphic Design"
            image={newbg}
            src="https://images.unsplash.com/photo-1698407691918-e68edb09fb80?auto=format&fit=crop&q=80&w=3498&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Box
            name="Music Composition"
            image={newbg}
            src="https://images.unsplash.com/photo-1531651008558-ed1740375b39?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Box
            name="Animation"
            image={newbg}
            src="https://images.unsplash.com/photo-1618176729090-253077a8f948?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>

      <div className="categories-section pl-10 flex flex-col bg-[#cfeefc] h-[22%]">
        <h1 className="text-black  text-left text-4xl font-bold category-heading pt-10">
          <span className="underline">Inspire</span> through your Work{" "}
        </h1>
        <p className="pt-4 text-xl text-gray-700 w-[60%]">
          The evolution and growth of your ideas into tangible, impactful
          creations, making your projects not just endeavors but living
          expressions of your creativity and vision.
        </p>
        <div className="pt-10 flex gap-1 flex-col justify-evenly w-[100%] text-x`xl font-semibold">
          <div className="flex items-center gap-2">
            {" "}
            <AiOutlineCheckCircle />{" "}
            <p className="">Collaborate with like minded people</p>
          </div>
          <div className="flex items-center gap-2 ">
            {" "}
            <AiOutlineCheckCircle /> <p className="">Opportumity to teach</p>
          </div>
          <div className="flex items-center gap-2 ">
            {" "}
            <AiOutlineCheckCircle /> <p className="">Enhance your Skills</p>
          </div>
          <div className="flex items-center gap-2 ">
            {" "}
            <AiOutlineCheckCircle /> <p className="">Share your Experiences</p>
          </div>
        </div>
      </div>

      {/* <div className="footer flex justify-between items-center absolute bottom-0 w-full border-t-2 border-gray-500 bg-white h-[70px]">
      <Link to="/">
        <div className="font-semibold brand-name text-3xl text-[#2a5fa3] text-2xl ml-4 z-4">
          <span className="font-bold">C</span>raft
          <span className="font-bold ">N</span>
          est
        </div>
        </Link>

        <div className="text-[#B5B6BA]">© CrafrNest Ltd. 2023</div>

        <div className="text-black text-xl flex items-center mr-10 ">
          <p>Contact | </p>
          <Link to="/">
          <AiFillLinkedin/>
          </Link>

          <Link to="/">
          <AiFillGithub/>
          </Link>
        </div>

       
      </div> */}
    </div>
  );
};

export default LandingPage;
