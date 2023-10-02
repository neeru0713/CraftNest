import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai"
import { BsCardImage } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";

export const ProjectInput = () => {
    const [fields, setFields] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(true)
    
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
        let index = event.target.getAttribute("data-id");
        
        const selectedFile = event.target.files[0];
        // setUploadedfile([
        //   ...uploadedfile,
        //   { id: idOfImage, file: selectedFile , previewUrl},
        // ]);

        // Use FileReader to generate a preview URL for the selected file
        const reader = new FileReader();
        reader.onloadend = () => {
            let modifiedArray = [...fields];

            modifiedArray[index].previewImageUrl = reader.result;
            setFields(modifiedArray);
            
        
            };
            reader.readAsDataURL(selectedFile);
        }

    function textChangeHandler(e) {
        let val = e.target.value;
        debugger
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
              <div className="flex " key={index}>
              {ele.type === "text" ? (
                      <textarea
                          type="text"
                          data-id={index}
                          onChange={textChangeHandler}
                          value={ele.value}
                          className="w-[90%] p-2 border border-x-none outline-none decoration-solid bg-transparent underline" />
                  ) : (
                    <div>
                              {!ele.previewImageUrl && <input type="file" data-id={index} onChange={handleFileChange} />}
                        {ele.previewImageUrl && <img src={ele.previewImageUrl} alt="Preview" style={{ width: "100px", height: "100px" }} />}
                    </div>
                  )}
                  <div onClick={removeElement} data-id={index}>
                      <BsTrash3Fill/>
                  </div>
            </div>
          ))}
        </div>
      </div>
    );
};
