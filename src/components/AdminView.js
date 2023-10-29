import React, { useEffect, useState } from "react";
import { API_URL } from "../config/config";
import { BsFillTrashFill } from "react-icons/bs";
import Table from "./Table";
import NavBar from "./NavBar";
export const AdminView = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = `${API_URL}/project`;

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
  }, [deleteRow]);

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
    <div className="bg-slate-700">
      <NavBar />
      <Table data={data} deleteRow={deleteRow} />

      {/* {data.map((item, index) => (
        <div className="flex border border-1 rounded w-[100%] justify-between items-center">
          <p>{item.title}</p>
          <BsFillTrashFill onClick={() => {deleteItem(item._id)}}/>
        </div>
      ))} */}
    </div>
  );
};
