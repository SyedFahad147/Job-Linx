import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { MdFindInPage } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';

const HowItWorks = () => {
  return (
    <div className='howitworks'>
      <div className='container'>
        <h3>How JobZee Works</h3>
        <div className='banner'>
          <div className='card'>
            <FaUserPlus />
            <p className='para1'>Create Account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
              facere mollitia!</p>
          </div>

          <div className='card'>
            <MdFindInPage />
            <p>Find a Job/Post a Job</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
              facere mollitia!</p>
          </div>

          <div className='card'>
            <IoMdSend />
            <p className='para1'>Apply For Job/Recruite Suitable Candidates</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
              facere mollitia!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
