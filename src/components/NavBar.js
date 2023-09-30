import  React, {useState } from 'react'
import Button from './Button';
import Modal from './Modal';

const NavBar = ({ mylogo }) => {
const [isModalOpen, setIsModalOpen] = useState(false);

    function loginHandler() {
        console.log("...............")
     setIsModalOpen(true)
 }
  return (
    <div className=" h-[70px] flex w-[100%] justify-between">
      <img scr={mylogo} height="40px" width="40px" />

      <div className=" w-[10%] h-[3rem] flex justify-between mr-[4rem] pt-[1rem]">
        <div onClick={loginHandler}>
          <Button name="Login" />
        </div>

        <Button name="Explore" />
      </div>
          <Modal isOpen={ isModalOpen} />
    </div>
  );
}

export default NavBar