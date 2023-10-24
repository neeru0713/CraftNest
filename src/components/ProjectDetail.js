import React, { useEffect, useState } from 'react'
import Navbar from "./NavBar"
import { API_URL } from "../config/config";
import { useParams } from "react-router-dom";
import { Carousel } from './Carousel';
import ChatApp from './ChatApp';
export const ProjectDetail = () => {
    const [data, setData] = useState()
  
    const params = useParams();
    
    useEffect(() => {
      
      const url = `${API_URL}/project/${params.category}`;

      fetch(url)
        .then((response) => {
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
    <div>
      <Navbar />
      <div className="blur-background overflow-hidden">
        <Carousel cards={data} />
      </div>
      <ChatApp/>
    </div>
  );
}
