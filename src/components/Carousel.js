import React, { useState, useEffect } from "react";
import Card from "./Card";
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
export const Carousel = ({ cards }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [clickedCard, setClickCard] = useState(-1);
  const [filteredCards, setFilteredCards] = useState();

  useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  const handleLeftClick = () => {
    setStartIndex((prev) => {
      return prev - 1;
    });
    setEndIndex((prev) => {
      return prev - 1;
    });

    let temp = [];

    for (let i = startIndex - 1; i <= endIndex - 1; i++) {
      let j = i;

      temp.push(cards[j]);
    }

    setFilteredCards(temp);
  };

  const handleRightClick = () => {
    setStartIndex((prev) => {
      return prev + 1;
    });
    setEndIndex((prev) => {
      return prev + 1;
    });
    let temp = [];

    for (let i = startIndex + 1; i <= endIndex + 1; i++) {
      let j = i;
      if (i >= cards.length) {
        j = i % cards.length;
      }
      temp.push(cards[j]);
    }
    setFilteredCards(temp);
  };

  function clickCardHandler(index) {
    setClickCard(index);
  }

  return (
    <div className="carousel h-[95vh] flex bg-gray-900 items-center w-[100%] px-8">
      {startIndex > 0 && clickedCard === -1 && (
        <button
          onClick={handleLeftClick}
          className="arrow left text-[50px] mr-8 absolute zindex-custom-2 bg-black border left-0 rounded-[100px]"
        >
          <IoChevronBackCircleOutline />
        </button>
      )}
      <div className="grid grid-cols-5 gap-8 h-[90%] w-[100%]">
        {cards?.slice(startIndex, endIndex + 1).map((card, index) => (
          <Card
            data={card}
            clickCardHandler={clickCardHandler}
            index={index}
            clickedCard={clickedCard}
            showCard={clickedCard === -1 || clickedCard === index}
          />
        ))}
      </div>
      {endIndex < cards?.length - 1 && clickedCard === -1 && (
        <button
          onClick={handleRightClick}
          className="arrow right text-[50px] arrow absolute right-0 zindex-custom-2 bg-black border rounded-[100px]"
        >
          <IoChevronForwardCircleOutline />
        </button>
      )}
    </div>
  );
};
