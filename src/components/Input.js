import React from "react";

const Input = ({ type, label, value, name, onChange, placeholder = "" }) => {
  return (
    <div className="form-group flex flex-col ">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className="border border-1 rounded border-white p-2 mt-1 bg-[#2B3149]"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
