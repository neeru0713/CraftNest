import React, { useState, useRef, useEffect, useContext } from "react";
import { AiFillGithub, AiOutlineMessage } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "./Button";
import ChatApp from "./ChatApp";

import { CreatorContext, ShowChatBoxContext } from "../App";

const Card = ({ data, clickCardHandler, index, showCard, clickedCard }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { creator, setCreator } = useContext(CreatorContext);
  const { showChatBox, setShowChatBox } = useContext(ShowChatBoxContext);

  useEffect(() => {
    setCreator(data?.user);
  }, [clickedCard]);

  function getUserName(email) {
    const userName = email.split("@")[0];
    return userName.charAt(0).toUpperCase() + userName.slice(1);
  }

  function getProjectImage() {
    let file = "";
    for (let index = 0; index < data.fields.length; index++) {
      const item = data.fields[index];
      if (item.type === "image") {
        file = item.file;
        break;
      }
    }
    return file;
  }

  function getImage(index) {
    let file = data.fields[index].file;
    return {
      backgroundImage: `url("data:image/png;base64,${file}")`,
      backgroundSize: "cover",
    };
  }

  function cardClickHandler() {
    cardRef.current.style.width = "95vw";
    clickCardHandler(index);
  }

  function getSomeText() {
    let text = "";
    data.fields.forEach((field) => {
      if (field.type === "text") {
        text = field.value.substr(0, 100);
      }
    });
    return text;
  }

  function getBgOfCard() {
    if (clickedCard === index) {
      return {
        background: `#ECE9E6` /* fallback for old browsers */,
        background: `-webkit-linear-gradient(to right, #FFFFFF, #ECE9E6)` /* Chrome 10-25, Safari 5.1-6 */,
        background: `linear-gradient(to right, #FFFFFF, #ECE9E6)` /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      };
    } else {
      return {
        backgroundImage: `url("data:image/png;base64,${getProjectImage()}")`,
      };
    }
  }

  const backButtonHandler = (e) => {
    e.stopPropagation();
    cardRef.current.style.width = "100%";
    clickCardHandler(-1);
  };

  return (
    <>
      {showCard && (
        <div
          ref={cardRef}
          onClick={cardClickHandler}
          class={`cursor-pointer card-parent relative rounded-[2rem] w-[100%] h-[100%] shadow-lg overflow-hidden cursor-pointer inline-block  ${
            clickedCard !== index
              ? ""
              : "transition-width duration-500 ease-in-out"
          }`}
          onMouseEnter={(e) => {
            setIsHovered(true);
          }}
          onMouseLeave={(e) => {
            setIsHovered(false);
          }}
        >
          {/* overlay with short view code */}
          {clickedCard !== index && isHovered && (
            <div class="card-overlay border rounded-[2rem] absolute inset-0 bg-black opacity-0 transition flex flex-col-reverse ">
              <div
                id="card-content"
                className="flex flex-col justify-between w-[100%] p-2 mb-4 opacity-100"
              >
                <div className="font-bold text-3xl opacity-100 text-white text-center z-[999] my-2">
                  {data.title}
                </div>
                {/* <hr className="w-[90%] mt-2 mb-1 border-1 border-orange-700 shadow-lg shadow shadow-orange-500/80" /> */}
                <div>{getSomeText()}</div>
              </div>
              <div className="absolute top-0 right-[6%] italic mt-2 text-md font-semibold">
                {getUserName(data?.user?.email)}
              </div>
            </div>
          )}

          {/* max view of card */}
          <div
            id="card"
            className={` ${
              clickedCard === index ? "overflow-scroll" : "card-child"
            } border rounded-[2rem] h-full w-full flex flex-col  bg-cover bg-center bg-no-repeat border-2 border-white`}
            style={getBgOfCard()}
          >
            {clickedCard === index && (
              <>
                <button
                  onClick={backButtonHandler}
                  className="absolute border border-2 border-slate-600 left-4 top-4 bg-slate-200 text-slate-600 pr-2 rounded hover:bg-slate-600 hover:text-white"
                >
                  <MdArrowBackIosNew className="inline mt-[-2px]" />
                  Back
                </button>

                <div className="flex w-[6%] absolute right-8 top-2 justify-between opacity-100 text-black">
                  <div>
                    <a href={data.projectUrl} target="_blank">
                      <AiFillGithub className="h-9 w-9 opacity-70 hover:opacity-100" />
                    </a>
                  </div>
                  <div>
                    {" "}
                    <AiOutlineMessage
                      onClick={() => {
                        setShowChatBox(true);
                      }}
                      className="h-9 w-9 opacity-70 hover:opacity-100"
                    />{" "}
                  </div>
                </div>
              </>
            )}

            {clickedCard === index && (
              <div className="h-full w-full">
                <h1 className="text-slate-700 text-3xl font-bold mt-4 text-center">
                  {data.title}
                </h1>
                {data.fields.map((item, index) =>
                  item.type === "text" ? (
                    <p className="text-slate-700 p-4 text-lg mt-2">
                      {item.value}
                    </p>
                  ) : (
                    <div
                      style={getImage(index)}
                      className="h-[100%] w-[60%] mt-4 m-auto border rounded-[20px] border-[3px] border-slate-600"
                    >
                      {" "}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
