import React, { useState } from "react";
import { AiFillGithub, AiOutlineMessage } from "react-icons/ai";

const Card = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
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

    function getSomeText() {
        let text = ""
        data.fields.forEach((field) => {
            if (field.type === "text") {
              text = field.value.substr(0,100)
          }
        })
        return text;
  }

  return (
    <div
      class="card-parent relative rounded-[2rem] w-[100%] h-[36rem] shadow-lg overflow-hidden cursor-pointer inline-block hover:shadow-orange-500/80"
      onMouseEnter={(e) => {
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
      }}
    >
      <div class="card-overlay border rounded-[2rem] absolute inset-0 bg-black opacity-0 transition flex flex-col-reverse ">
        {isHovered && (
          <>
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
            <div className="absolute top-0 right-[6%] italic mt-2 text-md font-semibold">{getUserName(data?.user?.email)}</div>
          </>
        )}
      </div>

      <div
        id="card"
        className="card-child border rounded-[2rem] h-full w-full flex flex-col bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url('data:image/png;base64,${getProjectImage()}')`,
        }}
      ></div>
    </div>
  );
};

export default Card;
