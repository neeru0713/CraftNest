import React from 'react'

const Modal = ({isOpen}) => {
  return (
    <div>
      {isOpen ? (
              <div className="flex fixed h-[100%] w-[100%] justify-center">
                  Modal
              </div>
      ) : null}
    </div>
  );
}

export default Modal