import React from 'react'
import {Link} from "react-router-dom"

export const PopoverItem = ({ itemName, handleHover, showBg=false }) => {
    return (
        <Link to={`projects/${itemName}`}>
        <div
          className={`popover-item ${showBg ? "bg-slate-400" : ""}`}
          onMouseEnter={(event) => handleHover(event, true)}
          onMouseLeave={(event) => handleHover(event, false)}
        >
          {itemName}
        </div>
      </Link>
    );
};
