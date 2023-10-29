import React from "react";
import { FaPencil } from "react-icons/fa6";
import { MdSaveAlt } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";

const Button = ({
  className = "",
  name,
  type = null,
  isButtonDisable = false,
  handleHover = () => {},
  handleSubmit = () => {},
  size = "medium",
  bgColor = "bg-transparent",
  hoverText = "black",
  contentColor = "",
}) => {
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
          className="text-[#2A3048] font-bold rounded border border-[3px] p-2 bg-white hover:bg-transparent hover:text-white hover:border-white"
          onClick={handleSubmit}
        >
          {name}
        </button>
      ) : (
        <button
          className={`${className} text-${contentColor} font-bold rounded border border-1 p-2 ${
            isButtonDisable
              ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
              : ""
          } ${bgColor} hover:text-${hoverText} ${getButtonSize()}`}
          disabled={isButtonDisable}
          onClick={handleSubmit}
          onMouseEnter={(event) => handleHover(event, true)}
          onMouseLeave={(event) => handleHover(event, false)}
        >
          {name}
          {name === "Save" && (
            <MdSaveAlt className="inline save-icon text-xl" />
          )}
          {name === "Contribute" && (
            <FaPencil className="inline ml-2 text-md" />
          )}
          {/* {name === "Text" && <PiTextTBold className="inline h-[20px] w-[20px]" />} */}
        </button>
      )}
    </>
  );
};

export default Button;
