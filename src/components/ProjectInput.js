import React, { useState, useEffect } from "react";
import { AiFillPlusCircle, AiOutlineCloudUpload } from "react-icons/ai";
import Button from "./Button";
import {
  BsCardImage,
  BsFillRocketTakeoffFill,
  BsTrash3Fill,
} from "react-icons/bs";

import { RxCrossCircled } from "react-icons/rx";
import {PiTextTBold} from "react-icons/pi";



export const ProjectInput = () => {
    const [fields, setFields] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isHovered, setIsHovered] = useState([]);
  
  const handleHover = (val, index) => {

     let modifiedArray = [...isHovered]
        modifiedArray[index].showCrossIcon = val;
        setIsHovered(modifiedArray);


  }
    
    const addTextElement = () => {
        let obj = {
          
          type: "text",
          value: "",
      };

      let hoverObj = {
        type: "text",
        showCrossIcon: false
      }
      setFields([...fields, obj])
      setIsHovered([...isHovered, hoverObj]);
    
    }

     const addImageElement = () => {
         let obj = {
          
           type: "image",
             previewImageUrl: null,
           file: null
         };
        let hoverObj = {
        type: "image",
        showCrossIcon: false
      }
      setFields([...fields, obj])
      setIsHovered([...isHovered, hoverObj]);
     };

 const handleFileChange = (event) => {
   const index = event.target.getAttribute("data-id");
   const selectedFile = event.target.files[0];

   if (selectedFile) {
     const reader = new FileReader();
     reader.onloadend = () => {
       let modifiedArray = [...fields];
       if (selectedFile.type.startsWith("image")) {
         // If the selected file is an image
         modifiedArray[index].previewImageUrl = reader.result;
         modifiedArray[index].previewVideoUrl = null; // Set video URL to null
       } else if (selectedFile.type.startsWith("video")) {
         // If the selected file is a video
         modifiedArray[index].previewVideoUrl = reader.result;
         modifiedArray[index].previewImageUrl = null; // Set image URL to null
       }
       setFields(modifiedArray);
     };

     // Read the selected file as data URL
     reader.readAsDataURL(selectedFile);
   }
 };

    function textChangeHandler(e) {
        let val = e.target.value;
        let index = e.target.getAttribute("data-id");
        let modifiedArray = [...fields]
        modifiedArray[index].value = val;
        setFields(modifiedArray);
      
    }

    function removeElement(e) {
       const elementWithDataId = e.target.closest("[data-id]");

       // If found, get the data-id attribute value
       if (elementWithDataId) {
         const index = elementWithDataId.getAttribute("data-id");
         const updatedArray = fields.filter(
           (obj,idx) => idx !== parseInt(index, 10)
         );
         setFields(updatedArray);
       }
  }
  
  const saveProject = (e) => {
    alert('save button clicked')
  }
    
    
    return (
      <div
        className={`${
          isDarkMode ? "bg-gray-700 text-white " : "bg-gray-100 text-black"
        } h-[100%] px-20`}
      >
        <div className="flex justify-center mb-8">
          <h1
            className={`text-3xl font-bold pt-4 ${
              isDarkMode ? "text-white" : "text-slate-700"
            }`}
          >
            Write your creative projects
          </h1>
          <BsFillRocketTakeoffFill className="mt-6 ml-2 text-3xl fill-[#a0144f]" />
        </div>
        <div onClick={addTextElement} className=" fixed right-6 top-16">
          <PiTextTBold className="h-[30px] w-[30px]" />
        </div>
        <div onClick={addImageElement} className=" fixed right-6 top-[100px]">
          <BsCardImage className="h-[30px] w-[30px]" />
        </div>
        <div className="flex flex-col gap-2">
          {fields.map((ele, index) => (
            <div
              className="flex justify-evenly relative"
              key={index}
              onMouseEnter={() => handleHover(true, index)}
              onMouseLeave={() => handleHover(false, index)}
            >
              {ele.type === "text" ? (
                <textarea
                  type="text"
                  autoFocus
                  data-id={index}
                  onChange={textChangeHandler}
                  value={ele.value}
                  className="w-[90%] p-2 border border-none outline-none decoration-solid bg-transparent underline"
                />
              ) : (
                <div className="h-[30%] w-[50%] text-center">
                  {!ele.previewImageUrl && (
                    <label for="inputTag" className="relative cursor-pointer">
                      <input
                        type="file"
                        data-id={index}
                        placeholder="Upload image / video"
                        onChange={handleFileChange}
                        className="hidden"
                        id="inputTag"
                      />
                      <AiOutlineCloudUpload className="text-3xl absolute left-[46%] top-[46%]" />
                    </label>
                  )}
                  {ele.previewImageUrl && (
                    <img
                      src={ele.previewImageUrl}
                      alt="Preview"
                      className="m-auto text-center"
                      style={{ height: "20%" }}
                    />
                  )}
                </div>
              )}
              {/* <div onClick={removeElement} data-id={index}>
                <BsTrash3Fill />
              </div> */}

              {isHovered[index].showCrossIcon && (
                <div
                  className={`delete-icon absolute ${
                    isHovered[index].type === "text"
                      ? "right-[50px]"
                      : "right-[310px]"
                  }`}
                  onClick={removeElement}
                  data-id={index}
                >
                  <RxCrossCircled className="text-2xl fill-[#a0144f]" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="fixed right-4 bottom-4">
          <Button
            name="Save"
            handleSubmit={saveProject}
            bgColor="bg-[#a0144f]"
            hoverText="black-400"
            className="save-btn"
          />
        </div>
      </div>
    );
};
