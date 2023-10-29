import React, { useState, useEffect, useRef, useContext } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {
  UserContext,
  SocketContext,
  CreatorContext,
  ShowChatBoxContext,
} from "../App";
import Button from "./Button";
const ChatApp = () => {
  const { user, setUser } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const { creator } = useContext(CreatorContext);
  const { showChatBox } = useContext(ShowChatBoxContext);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [reader, setReader] = useState("");

  const [messages, setMessages] = useState([]);
  const chatboxRef = useRef(null);

  function getUserName(email) {
    const userName = email.split("@")[0];
    return userName.charAt(0).toUpperCase() + userName.slice(1);
  }

  const minimizeChatBox = () => {
    setIsMinimized(true);
    if (chatboxRef.current) chatboxRef.current.style.height = "48px";
  };

  const maximizeChatBox = () => {
    setIsMinimized(false);
    if (chatboxRef.current) chatboxRef.current.style.height = "500px";
  };

  useEffect(() => {
    console.log("chatapp render");
    if (Object.keys(socket).length > 0) {
      socket.on("receive-message", (message) => {
        const { text, senderSocketId, recipientSocketId } = message;
        if (recipientSocketId === user.socketId) {
          // Handle the received message here
          console.log("Received message: ", text, " from ", senderSocketId);
          setMessages((prevMessages) => [
            { text, senderSocketId, recipientSocketId },
            ...prevMessages,
          ]);
        }
      });
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (Object.keys(socket).length > 0) {
        socket.off("receive-message");
      }
    };
  }, [socket]);

  function sendMessage() {
    setMessageInput("");
    const message = {
      text: messageInput,
      senderSocketId: user.socketId,
      recipientSocketId: reader || creator.socketId, // Use reader or project user's socketId as the recipient
    };
    console.log("sending message : ", message);
    setMessages([message, ...messages]);
    socket.emit("send-message", message);
  }

  return (
    <>
      {showChatBox && (
        <div
          ref={chatboxRef}
          className="flex flex-col justify-between zindex-custom-3 fixed right-2 bottom-0 bg-white h-[500px] w-[300px] border border-2 border-teal-600 text-black transition-height duration-500 ease-in-out rounded"
        >
          <div id="header" className="flex items-center justify-between mt-1">
            <div
              id="name"
              className="flex items-center justify-between w-[34%]"
            >
              <div className="border rounded-full gradient-username h-[38px] w-[40px] text-white font-semibold text-center pt-[8px] text-sm ml-1 ">
                NR
              </div>
              <div className="font-semibold text-lg">
                {getUserName(user?.email)}
              </div>
            </div>

            {isMinimized ? (
              <MdKeyboardArrowUp
                onClick={maximizeChatBox}
                className="h-[30px] w-[30px] text-teal-800"
              />
            ) : (
              <MdKeyboardArrowDown
                onClick={minimizeChatBox}
                className="h-[30px] w-[30px] text-teal-800"
              />
            )}
          </div>
          <div
            id="messages"
            className="bg-white  h-[418px] flex flex-col-reverse"
          >
            {messages.map((message, index) => (
              <div key={index}>
                <p>
                  <strong>{message.senderSocketId}:</strong> {message.text}
                </p>
              </div>
            ))}
          </div>
          <div id="chat-input" className="relative">
            <input
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
              }}
              className="h-[40px] w-[100%] border border-2 rounded-lg border-teal-600"
            />
            <Button
              handleSubmit={sendMessage}
              name="send"
              size="small"
              className="absolute right-[6px] rounded-[10px] mt-1 hover:text-white hover:bg-teal-800 border-teal-800"
              contentColor="teal-800"
              bgColor="bg-gray-100"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatApp;
