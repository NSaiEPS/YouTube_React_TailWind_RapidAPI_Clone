import React from 'react'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { categories } from './Constants';


const SideBar = ({setsidebarOpen}) => {
  return (
    <div
    className='flex 
    fixed
    top-[0px]
    h-[100vh]
    text-white
    w-[100%]
    z-[1]


    '
    >
    <div
    className='
    min-w-[250px]
    bg-primaryBlue
    
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

<div
    
    className='overflow-y-scroll
    h-[95vh]
    '
>
  {categories.map((items,index)=>(
    <div key={index}
    className='flex
    pl-[2px]
    mb-[10px]
    cursor-pointer
    '
    >
      <span>{items.icon}</span>
      <span>{items.name}</span>


      </div>
  ))}
</div>
    </div>

    <div
    className='bg-primaryBlackOpcity
    w-[100vw]
    '
    onClick={
      ()=>{
          setsidebarOpen(false)
      }}
    
    >
    </div>

    </div>
  )
}

export default SideBar
