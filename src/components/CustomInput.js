import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const CustomInput = ({
  className,
  showSearchIcon,
  value,
  onChanged,
}) => {
  const handleInputChange = async (event) => {
   onChanged(event.target.value);
  };

  return (
    <div className={`flex items-center relative p-2 ${className}`}>
      <input
        className="w-full border rounded-lg border-2 p-2"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleInputChange}
      />
      {showSearchIcon && (
        <IoSearch className="absolute right-[14%] text-lg text-[#dbd2d2]" />
      )}
    </div>
  );
};

export default CustomInput;
