import React from "react";
import { Link } from "react-router-dom";

export const PopoverItem = ({ itemName, handleHover, showBg = false }) => {
  return (
    <Link to={`/projects/${itemName}`}>
      <div
        className={`popover-item ${
          showBg ? "bg-[#545454]" : ""
        } text-left h-[100%] font-semibold text-white rounded-[10px]`}
        onMouseEnter={(event) => handleHover(event, true)}
        onMouseLeave={(event) => handleHover(event, false)}
      >
        {itemName}
      </div>
      {/* <hr className='border border-1 border-[#5e9ef0] w-[90%] mx-auto'/> */}
    </Link>
  );
};
