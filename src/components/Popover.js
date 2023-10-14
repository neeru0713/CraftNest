import React, {useState, useRef, useEffect} from 'react'
// import Button from "./Button"
import { PopoverItem } from './PopoverItem';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
export const Popover = () => {
    const popoverRef = useRef(null);
    const [show, setShow] = useState(false);
    const [hoverItem, setHoverItem] = useState('')

    useEffect(() => {
      if (popoverRef.current) {
        popoverRef.current.addEventListener("mouseenter", () => {
          setShow(true)
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
    <div id='popover'>
      {/* <div className=" w-[100%] text-white "> */}
      <div
        className="font-semibold text-white text-xl mt-1 flex ml-6 "
        onMouseEnter={(event) => showPopover(event, true)}
        onMouseLeave={(event) => showPopover(event, false)}
      >
        <span >Explore</span>
        <span className="mt-[6px] ml-2 h-10 w-10">
          {show ? <BiChevronUp /> : <BiChevronDown />}
        </span>
      </div>
      {/* </div> */}

      {show && (
        <div
          className="bg-white absolute right-[5%] w-[300px] h-[300px] rounded border border-2 border-teal-500 flex flex-col"
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
            itemName="Fashion Design"
            handleHover={popoverItemHover}
            showBg={hoverItem === "Fashion Design"}
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
}
