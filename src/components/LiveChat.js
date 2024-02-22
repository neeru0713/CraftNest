import React, { useState, useRef, useEffect, useContext } from "react";
import CustomInput from "./CustomInput";
import NavBar from "./NavBar";
import { FaUserCircle } from "react-icons/fa";
import { SocketContext, UserContext } from "../App";
import { json } from "react-router-dom";

export const LiveChat = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hoverItem, setHoverItem] = useState("");
  const popoverRef1 = useRef(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [clickChatIndex, setClickChatIndex] = useState(-1);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatInput, setChatInput] = useState("");
  const { socket, setSocket } = useContext(SocketContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
  
    if (Object.keys(socket).length > 0) {
      socket.on("receive-message", (data) => {
        let localStorageData = [];
        localStorageData.push(data.sender);
        localStorageData = JSON.stringify(localStorageData)
        localStorage.setItem("chats", localStorageData);
        setChatList([...chatList, data.sender]);
        setClickChatIndex(0);
        
        setMessages((prevMessages) => [data, ...prevMessages]);
      });
    }
  }, [socket]);

  useEffect(() => {
    let dataString = localStorage.getItem("chats");

    let data = JSON.parse(dataString);

    data.map((item, index) => {
    
      setChatList([...chatList, item]);
    });
  },[])

  const handleMouseEnter = (index) => {
    setHoverItem(index);
  };

  const handleMouseLeave = (index) => {
    setHoverItem(-1);
  };

  const handlePopOver = (event) => {
    // if (popoverRef1.current && !popoverRef1.current.contains(event.target)) {
    setIsPopoverVisible(false);
    // }
  };

  const handleChatIndexClick = (index) => {
    setClickChatIndex(index);
  };

  useEffect(() => {
    document.addEventListener("click", handlePopOver);
  }, []);

  const handleSerachItemClick = (index) => {
    let result = searchResults[index];
    setChatList([...chatList, result]);
  };

  const handleSendButton = () => {
    let obj = {
      message: chatInput,
      sender: user,
      receiver: chatList[clickChatIndex],
};

   
    
    const temp = [obj, ...messages];
    setMessages(temp);
    setChatInput("");
    socket.emit("send-message", obj);
    let data = [];
    data.push(obj.receiver);
    data = JSON.stringify(data)
    localStorage.setItem("chats", data)
  };


  const handleKeyDown = (event) => {
    debugger
    if (event.key === "Enter") {
       
      handleSendButton(event);
    }
   
  }
  
  
  const chatInputChange = (val) => {
    setChatInput(val);
  };

  const searchUserInputChange = async (val) => {
    try {
      setSearchTerm(val);
      if (val === "") {
        setSearchResults([]);
        return;
      }
      const response = await fetch(`http://localhost:8080/user/${val}`);
      const data = await response.json();
      setSearchResults(data.user);

      if (data.user.length > 0) {
        setIsPopoverVisible(true);
      } else {
        setIsPopoverVisible(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  return (
    <div className="h-screen bg-gray-900">
      <NavBar />

      <div className="bg-gray-100 h-[70%] flex w-[70%] m-auto mt-[4%] bg-[#fcf9f9] border rounded-lg">
        <section className="flex flex-col w-[25%] h-full border-r-2 border-white bg-white relative">
          <CustomInput
            className="w-full font-semibold"
            showSearchIcon={true}
            value={searchTerm}
            onChanged={searchUserInputChange}
          />

          {isPopoverVisible && (
            <ul
              ref={popoverRef1}
              className="border bg-gray-100 rounded-lg p-2 absolute m-10"
            >
              {searchResults?.map((item, index) => (
                <li
                  onClick={() => handleSerachItemClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  key={index}
                  className={`p-2 rounded-lg${
                    index === hoverItem ? "bg-gray-200" : ""
                  }`}
                >
                  {item.email}
                </li>
              ))}
            </ul>
          )}
          <h2 className="text-black text-left font-bold text-2xl mt-4 pl-3">
            My Chats
          </h2>

          {chatList?.length > 0 && (
            <div className="overflow-y-scroll h-[100%]">
              <ul className=" py-1 flex flex-col gap-1 font-semibold">
                {chatList?.map((item, index) => (
                  <li
                    onClick={() => handleChatIndexClick(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    key={index}
                    className={`px-1 py-2 text-md rounded cursor-pointer ${
                      index === hoverItem ? "bg-gray-100" : ""
                    }  ${index === clickChatIndex ? "bg-blue-200" : ""}`}
                  >
                    {item.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {clickChatIndex >= 0 && (
          <section className="w-[75%] h-full">
            <div className="flex w-full flex-col h-full ">
              <span className="flex bg-blue-500 p-2 w-[100%] gap-5 text-white font-bold text-lg">
                {<FaUserCircle className="text-3xl text-white" />}
                {chatList[clickChatIndex]?.email}
              </span>

              <ul className="flex flex-col-reverse h-[100%] overflow-y-scroll m-4 font-semibold">
                {messages.map((item, index) => (
                  <div
                    id="message-container"
                    className={`w-full flex ${
                      item?.sender?.email === user?.email
                        ? "justify-end"
                        : "justify-start"
                    } `}
                  >
                    <li
                      className={`border rounded-md border-slate-350 w-[30%] p-2 ${
                        item?.sender?.email !== user?.email
                          ? "bg-green-200"
                          : "bg-blue-200"
                      } text-semibold text-md mb-2`}
                      key={index}
                    >
                      {item.message}
                    </li>
                  </div>
                ))}
              </ul>
              <div className="flex w-full items-center px-6 gap-1">
                <CustomInput
                  className=" w-[100%]"
                  showSearchIcon={false}
                  value={chatInput}
                  onChanged={chatInputChange}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="rounded-xl text-white bg-blue-500 w-[10%] p-2 font-semibold"
                  onClick={handleSendButton}
                >
                  Send
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
