import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import { FaArrowLeft } from "react-icons/fa6";

export const LiveChat = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [hoverItem, setHoverItem] = useState("");
  const popoverRef1 = useRef(null);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [clickChatIndex, setClickChatIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoverItem(index);
  };

  const handleMouseLeave = (index) => {
    setHoverItem(-1);
  };

  const updateSearchResult = (data) => {
    setSearchResults(data);
    if (data.length > 0) {
      setPopoverVisible(true);
    } else {
      setPopoverVisible(false);
    }
  };

  const handlePopOver = (event) => {
    // if (popoverRef1.current && !popoverRef1.current.contains(event.target)) {
    setPopoverVisible(false);
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

  return (
    <div className="h-screen bg-gray-900">
      <NavBar />

      <div className="bg-gray-100 h-[60%] flex w-[70%] m-auto mt-40 bg-[#fcf9f9] border rounded-lg">
        <section className="flex flex-col w-[25%] h-full border-r-2 border-white bg-white relative">
          <SearchBar updateSearchResult={updateSearchResult} />

          {isPopoverVisible && (
            <ul
              ref={popoverRef1}
              className="border bg-gray-100 rounded-lg p-2 absolute mt-2 left-14"
            >
              {searchResults?.map((item, index) => (
                <li
                  onClick={() => handleSerachItemClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  key={index}
                  className={`p-2 rounded-lg ${
                    index === hoverItem ? "bg-gray-200" : ""
                  }`}
                >
                  {item.email}
                </li>
              ))}
            </ul>
          )}
          <h2 className="text-black text-left mt-10 font-semibold text-lg mb-2 pl-3">
            My Chats
          </h2>
          {chatList?.length > 0 && (
            <div className="px-1">
              <ul className="px-1 flex flex-col gap-1">
                {chatList?.map((item, index) => (
                  <li
                    onClick={() => handleChatIndexClick(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    key={index}
                    className={`px-1 py-1 text-md rounded cursor-pointer ${
                      index === hoverItem ? "bg-gray-100" : ""
                    }  ${index === clickChatIndex ? "bg-blue-100" : ""}`}
                  >
                    {item.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="w-[75%] h-full">
          <div className="flex w-full flex-col h-full">
            <header className="flex m-2 gap-1">
              <FaArrowLeft text-lg font-semibold />
              <p className="text-black">user</p>
            </header>
            <div className="h-[80%]"></div>
            <SearchBar />
          </div>
        </section>
      </div>
    </div>
  );
};
