import React from 'react'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';


const SideBar = ({setsidebarOpen}) => {
  return (
    <div
    className='flex 
    fixed
    top-[0px]
    h-[100vh]
    text-white
    w-[100%]
    


    '
    >
    <div
    className='
    min-w-[250px]
    bg-primaryBlue
    z-[1]
    
    '
    >
        <ViewHeadlineIcon
    onClick={
        ()=>{
            setsidebarOpen(false)
        }
    }
    className='
    cursor-pointer'
    />
Main content
    </div>

    <div
    className='bg-primaryBlack
    w-[100vw]
    '
    
    >
   black space
    </div>

    </div>
  )
}

export default SideBar
