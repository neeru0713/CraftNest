import React, { useState, useRef, useEffect } from "react";
import { AiFillGithub, AiOutlineMessage } from "react-icons/ai";
import Button from "./Button";

const Card = ({ data, clickCardHandler, index, showCard, clickedCard }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
  }, [clickedCard])

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
        background: "transparent",
      };
    } else {
      return {
        backgroundImage: `url("data:image/png;base64,${getProjectImage()}")`,
      };
    }
  }

  const backButtonHandler = (e) => {
    e.stopPropagation()
    cardRef.current.style.width = "100%";
    clickCardHandler(-1);
  };

  return (
    <>
      {showCard && (
        <div
          ref={cardRef}
          onClick={cardClickHandler}
          class="cursor-pointer card-parent relative rounded-[2rem] w-[100%] h-[38vw] shadow-lg overflow-hidden cursor-pointer inline-block hover:shadow-orange-500/80 transition-width duration-500 ease-in-out "
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
                <div className="flex w-[24%] justify-between opacity-100">
                  <div>
                    <a href={data.projectUrl} target="_blank">
                      <AiFillGithub className="h-7 w-7 opacity-100" />
                    </a>
                  </div>
                  <div>
                    {" "}
                    <AiOutlineMessage className="h-7 w-7 opacity-100" />{" "}
                  </div>
                </div>

                <div className="font-bold text-3xl opacity-100 my-2">
                  {data.title}
                </div>
                <hr className="w-[90%] mt-2 mb-1 border-1 border-orange-700 shadow-lg shadow shadow-orange-500/80" />
                <div>{getSomeText()}</div>
              </div>
              <div className="absolute top-0 right-[6%] italic mt-2 text-md font-semibold">
                {getUserName(data?.user?.email)}
              </div>
            </div>
          )}

          <div
            id="card"
            className={` ${
              clickedCard === index ? "" : "card-child"
            } border rounded-[2rem] h-full w-full flex flex-col bg-cover bg-center bg-no-repeat border-2 border-teal-600`}
            style={getBgOfCard()}
          >
            {clickedCard === index && <span onClick={backButtonHandler} className="text-black text-[50px] text-teal-600 absolute top-[-15px] left-2">&lt;</span>}
          </div>
        </div>
      )}

      {/* {clickedCard === index && (
        <div class="card-parent relative rounded-[2rem] w-[100%] h-[38vw] shadow-lg overflow-hidden cursor-pointer inline-block hover:shadow-orange-500/80">
          Hello
        </div>
      )} */}
    </>
  );
};

export default Card;
