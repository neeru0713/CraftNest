import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai"
import { BsCardImage } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";
import {PiTextTBold} from "react-icons/pi";


export const ProjectInput = () => {
    const [fields, setFields] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false)
    
    const addTextElement = () => {
        let obj = {
          
          type: "text",
          value: "",
        };
        setFields([...fields, obj])
    }

     const addImageElement = () => {
         let obj = {
          
           type: "image",
             previewImageUrl: null,
           file: null
         };
       setFields([...fields, obj]);
     };

    const handleFileChange = (event) => {
      const index = event.target.getAttribute("data-id");
      const selectedFile = event.target.files[0];

      // Create a Blob object from the selected file
      const videoBlob = new Blob([selectedFile], { type: selectedFile.type });

      // Use FileReader to generate a preview URL for the selected video file
      const reader = new FileReader();
      reader.onloadend = () => {
        let modifiedArray = [...fields];

        modifiedArray[index].previewVideoUrl = reader.result;
        setFields(modifiedArray);
      };

      // Read the Blob object as data URL
      reader.readAsDataURL(videoBlob);
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
    
    
    return (
      <div
        className={`${
          isDarkMode ? "bg-gray-700 text-white " : "bg-gray-100 text-black"
        } h-[93.2vh] px-20`}
      >
        <h1
          className={`text-3xl font-bold pt-4 text-center ${
            isDarkMode ? "text-white" : "text-slate-700"
          }`}
        >
          Share your talent
        </h1>
        <div onClick={addTextElement} className=" fixed right-6 top-16">
          <PiTextTBold className="h-[30px] w-[30px]"/>
        </div>
        <div onClick={addImageElement} className=" fixed right-6 top-[100px]">
          <BsCardImage className="h-[30px] w-[30px]" />
        </div>
        <div className="flex flex-col gap-2">
          {fields.map((ele, index) => (
            <div className="flex justify-evenly" key={index}>
              {ele.type === "text" ? (
                <textarea
                  type="text"
                  data-id={index}
                  onChange={textChangeHandler}
                  value={ele.value}
                  className="w-[90%] p-2 border border-none outline-none decoration-solid bg-transparent underline"
                />
              ) : (
                <div className="h-[30%] w-[50%] text-center">
                  {!ele.previewImageUrl && (
                    <input
                      type="file"
                      data-id={index}
                      onChange={handleFileChange}
                    />
                  )}
                  {ele.previewImageUrl && (
                    <img
                      src={ele.previewImageUrl}
                      alt="Preview"
                      className="m-auto text-center"
                      style={{ height: "50%" }}
                    />
                  )}
                </div>
              )}
              <div onClick={removeElement} data-id={index}>
                <BsTrash3Fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};
