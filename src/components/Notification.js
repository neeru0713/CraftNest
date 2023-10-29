import React, { useState, useEffect } from "react";

export const Notification = ({ show, msg }) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(show);
    setTimeout(() => {
      setIsShow(false);
    }, 5000);
  }, [show]);

  return (
    <>
      {isShow && show ? (
        <div className="notification border border-2 p-2 rounded-[10px] border-teal-600 bg-teal-100 font-semibold text-lg w-[600px]  fixed top-[20%] left-[30%] text-black">
          {msg}
        </div>
      ) : null}
    </>
  );
};
