import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({updateSearchResult}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = async(event) => {
       
        try {
            
            setSearchTerm(event.target.value);
            if(event.target.value === ''){
                updateSearchResult([]);
                return;
            }
            const response = await fetch(`http://localhost:8080/user/${event.target.value}`);
            const data = await response.json();
            updateSearchResult(data.user);  
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };

    return (
        <div className="w-full flex items-center relative p-2">
            <input
                className="w-[80%] m-auto border rounded-lg border-2 p-2"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <IoSearch className="absolute right-[14%] text-lg text-[#dbd2d2]" />
        </div>
    );
};

export default SearchBar;
