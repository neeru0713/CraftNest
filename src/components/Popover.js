import React, { useState, useRef, useEffect, useContext } from "react";
// import Button from "./Button"
import { PopoverItem } from "./PopoverItem";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { UserContext } from "../App";


export const Popover = () => {
  const popoverRef = useRef(null);
  const [show, setShow] = useState(false);
  const [hoverItem, setHoverItem] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (popoverRef.current) {
      popoverRef.current.addEventListener("mouseenter", () => {
        setShow(true);
      });

      popoverRef.current.addEventListener("mouseleave", () => {
        setShow(false);
      });
    }
  }, [show]);

  const showPopover = (event, val) => {
    setShow(val);
  };

  const popoverItemHover = (event, val) => {
    setHoverItem(event.target.innerText);
  };
  return (
    <div id="popover">
      {/* <div className=" w-[100%] text-white "> */}
      <div
        className="font-semibold text-white text-xl mt-4 flex ml-6 "
        onMouseEnter={(event) => showPopover(event, true)}
        onMouseLeave={(event) => showPopover(event, false)}
      >
        <span className="text-2xl mt-1">Explore</span>
        <span className="mt-[9px] ml-2 h-12 w-12">
          {show ? <BiChevronUp /> : <BiChevronDown />}
        </span>
      </div>
      {/* </div> */}

      {show && (
        <div
          className={`bg-[#383838] absolute ${
            !user ? "right-[5%] " : "right-[10%]"
          }  top-[50px] w-[180px] p-2 rounded-[14px] flex flex-col`}
          id="explore-popover"
          ref={popoverRef}
        >
          <PopoverItem
            itemName="Photography"
            handleHover={popoverItemHover}
            showBg={hoverItem === "Photography"}
          />
          <PopoverItem
            itemName="Writing"
            handleHover={popoverItemHover}
            showBg={hoverItem === "Writing"}
          />
          <PopoverItem
            itemName="Web Design"
            handleHover={popoverItemHover}
            showBg={hoverItem === "Web Design"}
          />
          <PopoverItem
            itemName="Graphic Design"
            handleHover={popoverItemHover}
            showBg={hoverItem === "Graphic Design"}
          />

          <PopoverItem
            itemName="Music Composition"
            handleHover={popoverItemHover}
            showBg={hoverItem === "Music Composition"}
          />
          <PopoverItem
            itemName="Animation"
            handleHover={popoverItemHover}
            showBg={hoverItem === "Animation"}
          />
        </div>
      )}
    </div>
  );
};
