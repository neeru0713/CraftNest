import React from "react";

const Button = ({ name, type, isButtonDisable, handleSubmit, size = "medium" ,bgColor}) => {
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
          className={`text-white font-bold rounded border border-1 p-2 ${bgColor} hover:bg-transparent ${getButtonSize()}`}
          disabled={isButtonDisable}
          onClick={handleSubmit}
        >
          {name}
        </button>
      )}
    </>
  );
};

export default Button;
