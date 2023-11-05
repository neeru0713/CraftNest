import React, { useState, useEffect } from "react";
import TableRow from "./TableRow"; // Assuming TableRow component is in a separate file
import Button from "./Button";
const Table = ({data, deleteRow}) => {


  return (
    <div className="flex flex-col mt-14">
      <h1 className="text-center text-white text-4xl font-bold">
        {" "}
        <span className="text-teal-600">P</span>roject{" "}
        <span className="text-teal-600">M</span>anagement{" "}
        <span className="text-teal-600">D</span>ashboard
      </h1>
     
      <div className="mt-10 overflow-x-hidden  m-auto w-[85%] bg-white border border-slate-300 shadow-lg shadow-slate-500/40 hover:shadow-blue-500/80 ">
        <table className="flex flex-col text-black text-md pt-6 pl-2 w-[95%] h-100">
          <thead className="flex justify-between text-slate-500 text-xs pt-4 w-[100%] py-4">
            <tr className="flex justify-between w-[100%]">
              <th className="w-[25%]">Title</th>
              <th className="w-[35%]">Photo</th>
              <th className="w-[25%]">Domain</th>
              <th className="w-[15%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project, index) => (
              <TableRow
              project={project}
                index={index}
                
                deleteRow={(event, index) => {deleteRow(event, index)}}
               
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
