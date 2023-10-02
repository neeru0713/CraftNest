import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai"
import { BsCardImage } from "react-icons/bs";

export const ProjectInput = () => {
    const [fields, setFields] = useState([]);
    const [inputValue, setInputValue] = useState([])
     const [file, setFile] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(true)
     const [previewUrl, setPreviewUrl] = useState(null);
    
    const addTextElement = () => {
        let obj = {
            id: fields.length + 1,
            type: "input",
            value: ""
        }
        setFields([...fields, obj])
        
    }

     const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Use FileReader to generate a preview URL for the selected file
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };


    const addImageElement = () => {
      let obj = {
        id: fields.length + 1,
        type: "image",
        value: "",
      };
      setFields([...fields, obj]);
    };
    return (
      <div
        className={`${
          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
        } h-[93.2vh] px-20`}
      >
        <div onClick={addTextElement} className=" fixed right-6 top-16">
          <AiFillPlusCircle className="h-[30px] w-[30px]" />
        </div>
        <div onClick={addImageElement} className=" fixed right-16 top-16">
          <BsCardImage className="h-[30px] w-[30px]" />
        </div>
        <div className="flex flex-col gap-2">
          {fields.map((ele, index) => (
            <div>
              {ele.type === "input" ? (
                <textarea type="input" data-id={ele.id} className="w-[90%] p-2 border border-x-none outline-none decoration-solid bg-transparent underline"/>
                  ) : (
                          <div>
                          <input type="file" data-id={ele.id} onChange={handleFileChange}  />
                              {previewUrl && <img src={previewUrl} alt="Preview" style={{ width: "100px", height: "100px" }} />}
                              </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
};
