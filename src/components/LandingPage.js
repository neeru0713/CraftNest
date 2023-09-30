import React from 'react'
import NavBar from './NavBar'
import Button from './Button';

const LandingPage = ({mylogo}) => {
    return (
      <div className="h-[100vh] w-[100%] landing-page flex flex-col">
        <NavBar mylogo={mylogo} />
        <div className="ml-[8rem] my-auto">
          <p className="text-white font-bold text-6xl w-[40%] mb-6 justify-between italic">
            Where creativity finds it's nest
          </p>
          <Button name="Contribute"/>
        </div>
        
      </div>
    );
}

export default LandingPage