import React from 'react'

const Navbar = ({onShowForm}) => {

  return (
    <div className='flex justify-between items-center sticky top-0 z-40 bg-white px-32 py-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] h-[65px] w-full'>
      <div className='flex justify-center items-center'>
        <img src="./blackboard.png" alt="logo" className='mr-3 w-[25px] h-[25px]'/>
        <p className='text-[24px] font-bold '>Sticky Board</p>
      </div>
      <div>
        <button className='py-[4px] px-4 rounded-md border-none bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[18px] font-semibold' onClick={onShowForm}><span className='font-bold text-[21px]'>+</span> Add Task</button>
      </div>
    </div>
  )
}

export default Navbar