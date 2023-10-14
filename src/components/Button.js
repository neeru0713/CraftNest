import React from "react";

import { MdSaveAlt } from "react-icons/md";

const Button = ({ className, name, type = null,
  isButtonDisable = false, handleHover = () => { },
  handleSubmit, size = "medium", bgColor,
  hoverBg = "bg-transparent", hoverText = "black",
  contentColor = "white" }) => {
  function getButtonSize() {
    if (size === "small") {
      return "text-xs";
    }
    if (size === "large") {
      return "text-lg";
    }
    if (size === "medium") {
      return "text-md";
    }
  }
  return (
    <>
      {type === "form-btn" ? (
        <button
          className="text-[#28264b] font-bold rounded border border-[3px] p-2 bg-white hover:bg-transparent hover:text-white hover:border-white"
          disabled={isButtonDisable}
          onClick={handleSubmit}
        >
          {name}
        </button>
      ) : (
        <button
          className={`${className} text-${contentColor} font-bold rounded border border-1 p-2 ${bgColor} hover:${hoverBg} hover:text-${hoverText} ${getButtonSize()}`}
          disabled={isButtonDisable}
          onClick={handleSubmit}
          onMouseEnter={(event) => handleHover(event, true)}
          onMouseLeave={(event) => handleHover(event, false)}
        >
          {name}
          {name === "Save" && (
            <MdSaveAlt className="inline save-icon text-xl" />
          )}
        </button>
      )}
    </>
  );
};

export default Button;
