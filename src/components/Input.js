import React from "react";

const Input = ({ type, label, value, name, onChange, placeholder="" }) => {
  return (
    <div className="form-group flex flex-col ">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        className="border border-1 border-gray-700 p-1 mt-1"
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
