import React, { useState, useContext, useRef } from "react";
import { AiOutlineCloudUpload, AiFillCloseCircle } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { API_URL } from "../config/config";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext, ModalContext } from "../App";
import { Notification } from "./Notification";
import { BsCardImage, BsCheck2Square } from "react-icons/bs";
import { GiPencil } from "react-icons/gi";

import { RxCrossCircled } from "react-icons/rx";
import { PiTextTBold } from "react-icons/pi";

export const ProjectInput = () => {
  const textareaRef = useRef([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [fields, setFields] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [showHeading, setShowHeading] = useState(true);
  const [projectTitle, setProjectTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState(
    "Project saved successfully"
  );

  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);

  const handleHover = (val, index) => {
    // console.log(val,index)
    let modifiedArray = [...isHovered];
    modifiedArray[index].showCrossIcon = val;
    // console.log(isHovered);
    setIsHovered(modifiedArray);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addTextElement = () => {
    let obj = {
      type: "text",
      value: "",
    };

    let hoverObj = {
      type: "text",
      showCrossIcon: false,
    };
    setFields([...fields, obj]);
    setIsHovered([...isHovered, hoverObj]);
  };

  const addImageElement = () => {
    let obj = {
      type: "image",
      previewImageUrl: null,
      file: null,
    };
    let hoverObj = {
      type: "image",
      showCrossIcon: false,
    };
    setFields([...fields, obj]);
    setIsHovered([...isHovered, hoverObj]);
  };

  const handleFileChange = (event, index) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      let modifiedArray = [...fields];
      if (selectedFile.type.startsWith("image")) {
        // If the selected file is an image

        modifiedArray[index].file = selectedFile; // Set the file object

        modifiedArray[index].previewImageUrl = reader.result;
        modifiedArray[index].previewVideoUrl = null; // Set video URL to null
      } else if (selectedFile.type.startsWith("video")) {
        // If the selected file is a video
        modifiedArray[index].file = selectedFile; // Set the file object
        modifiedArray[index].previewVideoUrl = reader.result;
        modifiedArray[index].previewImageUrl = null; // Set image URL to null
      }
      setFields(modifiedArray);
    };

    // Read the selected file as data URL
    reader.readAsDataURL(selectedFile);
  };

  function textChangeHandler(e) {
    let index = e.target.getAttribute("data-id");

    textareaRef.current[index].style.height = "auto";
    textareaRef.current[index].style.height =
      textareaRef.current[index].scrollHeight + "px";
    let val = e.target.value;

    let modifiedArray = [...fields];
    modifiedArray[index].value = val;
    setFields(modifiedArray);
  }

  function removeElement(e, index) {
    //  const elementWithDataId = e.target.closest("[data-id]");

    // If found, get the data-id attribute value
    //  if (elementWithDataId) {
    //  const index = elementWithDataId.getAttribute("data-id");
    const updatedArray = fields.filter((e, idx) => idx !== index);
    setFields(updatedArray);
  }

  const saveProject = async (e) => {
    let newArray = fields.map((ele, index) => {
      if (ele.type === "image") {
        const { previewImageUrl, previewVideoUrl, ...rest } = ele;
        return rest;
      }
      return ele;
    });

    const formData = new FormData();
    // const userBlob = new Blob([JSON.stringify(user)], { type: 'application/json' });
    formData.append("user", JSON.stringify(user));
    formData.append("title", projectTitle);
    formData.append("domain", selectedOption);
    formData.append("projectUrl", projectLink);

    fields.forEach((item) => {
      if (item.type === "image") {
        formData.append("file", item.file);
        formData.append(
          "fields",
          JSON.stringify({
            type: "image",
            image: item.file.name.replace(/\s+/g, "-"),
            value: null,
          })
        );
      } else {
        formData.append(
          "fields",
          JSON.stringify({
            type: "text",
            value: item.value,
            image: null,
          })
        );
      }
    });

    let url = `${API_URL}/project`;

    axios.post(url, formData, {}).then((res) => {
      console.log(res);
      setShowNotification(true);
      setTimeout(() => {
        navigate(`/projects/${selectedOption}`);
      }, 1500);
    });

    // Handle the response from the server
    // const data = await response.json();
    // console.log(data.message);
  };

  return (
    <div className={` h-auto  px-20 relative mt-10`}>
      <div id="header" className="flex justify-evenly ml-[38%] w-[60%]">
        <div
          onClick={addTextElement}
          className="text-white fixed flex left-[2%] top-[10%]"
        >
          <Button
            name="Text"
            className="bg-green-700 hover:bg-green-600  w-[80px]"
          />
        </div>
        <div
          onClick={addImageElement}
          className="text-white fixed flex left-[2%] top-[16%]"
        >
          <Button
            name="Image"
            className="bg-green-700 hover:bg-green-600 w-[80px]"
          />
          {/* <BsCardImage className="h-[30px] w-[30px]" /> */}
        </div>

        {showHeading ? (
          <GiPencil
            className="mt-1 text-xl fill-slate-100 h-8 w-10"
            onClick={() => {
              setShowHeading(false);
            }}
          />
        ) : (
          <BsCheck2Square
            className="mt-2 text-3xl mr-2 fill-slate-100 h-8 w-10"
            onClick={() => {
              setShowHeading(true);
            }}
          />
        )}

        <div className="flex w-[100%] mb-8">
          {showHeading ? (
            <h1 className={`text-4xl w-full font-bold text-white`}>
              {projectTitle.length === 0 ? "Project Title" : projectTitle}
            </h1>
          ) : (
            <input
              type="text"
              placeholder="Project Title"
              value={projectTitle}
              className="w-[24rem] p-2 border border-2 rounded-[10px] border-slate-800 font-semibold"
              onChange={(e) => {
                setProjectTitle(e.target.value);
              }}
            />
          )}

          {/* <BsFillRocketTakeoffFill className="mt-6 ml-2 mt-[28px] text-3xl fill-teal-600" /> */}
        </div>
      </div>

      < div
        id="main-section"
        className="flex flex-col ml-[7%] h-[100%] min-h-[92vh] gap-2 w-[80%]"
      >
        {fields.map((ele, index) => (
          <div
            className="flex relative mb-6"
            key={index}
            onMouseEnter={() => handleHover(true, index)}
            onMouseLeave={() => handleHover(false, index)}
          >
            {ele.type === "text" ? (
              <textarea
                type="text"
                autoFocus
                ref={(element) => {
                  if (element) {
                    textareaRef.current[index] = element;
                  }
                }}
                data-id={index}
                onChange={textChangeHandler}
                value={ele.value}
                className="w-[100%] p-4 block border rounded-[10px] border-1 border-slate-100 resize-none text-white decoration-solid bg-transparent text-lg"
              />
            ) : (
              <div className="h-[30%] w-[100%] text-center">
                {!ele.previewImageUrl && (
                  <label for="inputTag" className="relative cursor-pointer">
                    <input
                      type="file"
                      name="file"
                      data-id={index}
                      placeholder="Upload image / video"
                      onChange={(event) => {
                        handleFileChange(event, index);
                      }}
                      className="hidden"
                      id="inputTag"
                    />
                    <p className="mt-[10%]">Upload image file</p>
                    <AiOutlineCloudUpload className="text-3xl absolute left-[46%] top-[20%]" />
                  </label>
                )}
                {ele.previewImageUrl && (
                  <img
                    src={ele.previewImageUrl}
                    alt="Preview"
                    className="m-auto text-center w-[100%]"
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
                className={`delete-icon top-[2%] absolute right-[0.4%]`}
                onClick={(event) => {
                  removeElement(event, index);
                }}
                data-id={index}
              >
                <AiFillCloseCircle className="text-2xl h-8 w-8 fill-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-[13%] fixed right-0 top-[20%] h-[300px] ">
        <select
          id="dropdown"
          className=" border border-2 p-2 rounded-[10px] border-slate-100 font-semibold"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="">Select domain</option>
          <option value="Photography">Photography</option>
          <option value="Writing">Writing</option>
          <option value="Web Design">Web Design</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Fashion Design">Fashion Design</option>
          <option value="Music Composition">Music Composition</option>
          <option value="Animation">Animation</option>
        </select>

        <input
          className="border border-2 p-2 rounded-[10px] border-slate-200 font-semibold w-[90%] mt-2"
          onChange={(e) => {
            setProjectLink(e.target.value);
          }}
          type="text"
          placeholder="Project Url"
          value={projectLink}
        ></input>
      </div>
      <div className="fixed right-4 bottom-4">
        <Button
          name="Save"
          handleSubmit={saveProject}
          bgColor="bg-green-700"
          isButtonDisable={fields.length > 1 ? false : true}
          className="hover:bg-green-600 text-white"
        />
      </div>
      <Notification show={showNotification} msg={notifMessage} />
    </div>
  );
};
