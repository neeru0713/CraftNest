import React, { useState } from "react";
import { Link } from "react-router-dom";
export const Box = ({ name, image, src }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link to={`/projects/${name}`}>
      <div
        className="mt-1 relative overflow-hidden flex flex-col rounded h-[100%] w-[240px] all-shadow"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div className="box-font absolute text-white font-bold text-3xl mt-2 ml-1">
          {name}
        </div>

        <img
          src={src}
          className="h-[350px] w-[100%] bg-cover bg-no-repeat bg-center"
        />
        {hover && <div className="white-sheet absolute inset-0"></div>}
      </div>
    </Link>
  );
};
