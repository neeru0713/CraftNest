import React from "react";
import NavBar from "./NavBar";
import Button from "./Button";
import { Link } from "react-router-dom";
const LandingPage = ({ user }) => {
  return (
    <div className="h-[100vh] w-[100%] landing-page flex flex-col">
      <NavBar user={user} />
      <div className="ml-[8rem] mt-[10rem]">
        <p className="text-white font-bold text-6xl w-[50%] mb-6 justify-between ">
          Where creativity finds it's nest
        </p>
        <Link to="/contribute">
          <Button name="Contribute" bgColor="bg-slate-800"/>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
