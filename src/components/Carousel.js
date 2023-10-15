import React, { useState } from "react";
import Card from "./Card";
export const Carousel = ({ cards }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);

  const handleLeftClick = () => {
    setStartIndex((prev) => {
      return prev === 0 ? 0 : prev - 1;
    });
    setEndIndex((prev) => {
      return prev === 0 ? 0 : prev - 1;
    });
  };

  const handleRightClick = () => {
    setStartIndex((prev) => {
      return prev === cards.length - 1 ? cards.length - 1 : prev + 1;
    });
    setEndIndex((prev) => {
      return prev === cards.length - 1 ? cards.length - 1 : prev + 1;
    });
  };

  return (
    <div
      className="carousel flex items-center w-[100%] pt-[6rem]"
    >
      <button onClick={handleLeftClick} className="arrow left text-[50px] mr-8">
        &#8249;
      </button>

      <div className="grid grid-cols-5 gap-8 w-[100%]">
        {cards?.slice(startIndex, endIndex + 1).map((card, index) => (
          <Card data={card} />
        ))}
      </div>

      <button onClick={handleRightClick} className="arrow right text-[50px]">
        &#8250;
      </button>
    </div>
  );
};
