import React, { useState, useEffect } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
const TableRow = ({
  project,
  index,
  deleteRow
}) => {

function getProjectImage() {
    let file = "";
    console.log("..", project)
  for (let index = 0; index < project.fields.length; index++) {
    const item = project.fields[index];
    if (item.type === "image") {
      file = item.file;
      break;
    }
  }
  return file;
}

  return (
    <tr className="flex justify-between text-slate-800 text-xs w-[100%] py-4 border-b border-teal-100">
      <td className="w-[25%] ">{project.title}</td>
      <td className="w-[35%]">
        <img
         src={`data:image/png;base64,${getProjectImage()}`}
                 
          className="h-[100%] w-[100%]"
        />
      </td>
      <td className="w-[25%]">{project.domain}</td>
      <td className="w-[15%]">
        <BiTrashAlt
         
          onClick={(event) => {
            deleteRow(event, index);
          }}
          className="deleteIconRed"
          id="trashBtn"
        />
      </td>
    </tr>
  );
};

export default TableRow;
