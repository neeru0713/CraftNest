import React from 'react'

const Button = ({name}) => {
    return (
          
        <button className="text-white font-bold rounded border border-2 p-2 bg-cyan-800 hover:bg-transparent">
        {name}
        </button>
       
     
    );
}

export default Button