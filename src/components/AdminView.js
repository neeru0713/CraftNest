import React, { useEffect, useState } from "react";
import { API_URL } from "../config/config";
import { BsFillTrashFill } from "react-icons/bs";
import Skeleton from '@mui/material/Skeleton';

import Table from "./Table";
import NavBar from "./NavBar";
export const AdminView = () => {
  const [data, setData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    const url = `${API_URL}/project`;
    setIsDataLoading(true)

    fetch(url)
      .then((response) => {
        setTimeout(()=>{setIsDataLoading(false)}, 2000)
        
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
  }, []);

  function deleteRow(event, index) {
    fetch(`${API_URL}/project/${data[index].title}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // You can include additional headers if needed, such as authorization tokens
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data.message); // Log the response from the server after successful deletion
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  return (
    <div className="bg-gray-900 min-h-[100vh]">
      <NavBar />
      {isDataLoading && 
      <div>
      <Skeleton className="mt-20 m-auto mb-2" variant="rounded" animation="wave" width={1500} height={60}  sx={{ bgcolor: '#243149' }} />
      <Skeleton className="m-auto mb-20" variant="rounded" animation="wave" width={1500} height={750}  sx={{ bgcolor: '#243149' }} />
      </div>}
      

      {!isDataLoading && <Table data={data} deleteRow={deleteRow} /> }

      {/* {data.map((item, index) => (
        <div className="flex border border-1 rounded w-[100%] justify-between items-center">
          <p>{item.title}</p>
          <BsFillTrashFill onClick={() => {deleteItem(item._id)}}/>
        </div>
      ))} */}
    </div>
  );
};
