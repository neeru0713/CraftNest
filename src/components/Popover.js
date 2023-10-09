import React, {useState, useRef, useEffect} from 'react'
import Button from "./Button"
import { PopoverItem } from './PopoverItem';
export const Popover = () => {
    const popoverRef = useRef(null);
    const [show, setShow] = useState(false);
    const [hoverItem, setHoverItem] = useState('')

    useEffect(() => {
      console.log("use effect run hoya");
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
    <div>
      <Button
        name="Explore"
        handleHover={showPopover}
        bgColor={"bg-slate-500"}
        className="w-[70%]"
      />
      {show && (
        <div className="bg-white" id="explore-popover" ref={popoverRef}>
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
            showBg={hoverItem === "Graphic Design "}
          />
        </div>
      )}
    </div>
  );
}
