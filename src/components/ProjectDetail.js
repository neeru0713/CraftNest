import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { API_URL } from "../config/config";
import { useParams } from "react-router-dom";
import { Carousel } from "./Carousel";
import ChatApp from "./ChatApp";
export const ProjectDetail = () => {
  const [data, setData] = useState();
  const [isDataLoading, setIsDataLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    const url = `${API_URL}/project/${params.category}`;
    setIsDataLoading(true)
    fetch(url)
      .then((response) => {
        setIsDataLoading(false)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the JSON data in the 'data' variable
        setData(data);
        console.log("..", data);
      })
      .catch((error) => {
        // Handle errors occurred during the fetch
        console.error("Error:", error);
      });
  }, [params.category]);

  return (
    <div className="bg-gray-900">
      <Navbar />
      <div className="bg-gray-900 overflow-hidden">
        <Carousel cards={data} isDataLoading={isDataLoading}/>
      </div>
      <ChatApp />
    </div>
  );
};
