import React from 'react'
import {Link} from "react-router-dom"

export const PopoverItem = ({ itemName, handleHover, showBg=false }) => {
    return (
        <Link to={`projects/${itemName}`}>
        <div
          className={`popover-item ${showBg ? "bg-teal-500" : ""} text-center h-[100%] font-semibold `}
          onMouseEnter={(event) => handleHover(event, true)}
          onMouseLeave={(event) => handleHover(event, false)}
        >
          {itemName}
        </div>
        <hr className='border border-1 border-teal-200 w-[90%] mx-auto'/>
      </Link>
    );
};
