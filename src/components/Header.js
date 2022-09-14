import React from 'react'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

const Header = ({setsidebarOpen}) => {
  return (
    <div
    className={
        `flex
        bg-primaryBlack
        text-white
        justify-between
        p-[20px]
        py-[25px]
        boder-Box
        `
    }
    >
   <div
   className=''
   >
    <ViewHeadlineIcon
    onClick={
        ()=>{
            setsidebarOpen(true)
        }
    }
    className='
    cursor-pointer'
    />
     </div>
   <div>Input & Search</div>
   <div>Login</div>
    </div>
  )
}

export default Header
