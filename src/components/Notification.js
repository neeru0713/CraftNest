import React from 'react'

export const Notification = ({msg}) => {
  return (
      <div className='notification border border-1 border-cyan-700 w-[100px] h-[20px] fixed top-10 left-10 bg-blue-400'>
          {msg}
    </div>
  )
}
