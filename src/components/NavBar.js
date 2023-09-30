import React from 'react'
import Button from './Button';
const NavBar = ({mylogo}) => {
  return (
    <div className=" h-[70px] flex w-[100%] justify-between">
     
        <img scr={mylogo} height="40px" width="40px" />
     
      <div className=" w-[10%] flex justify-between mr-[4rem] pt-[1rem]">
          <Button name="Login"/> 
          <Button name="Explore" />
      </div>
    </div>
  );
}

export default NavBar