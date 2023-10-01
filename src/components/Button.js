import React from "react";

const Button = ({ name, type, isButtonDisable, handleSubmit }) => {
  return (
    <>
      {type === "form-btn" ? (
        <button
          className="text-[#28264b] font-bold rounded border border-[3px] p-2 bg-white hover:bg-[#242243] hover:text-white hover:border-[#28264b]"
          disabled={isButtonDisable}
          onClick={handleSubmit}
        >
          {name}
        </button>
      ) : (
        <button
          className="text-white font-bold rounded border border-2 p-2 bg-cyan-800 hover:bg-transparent"
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
