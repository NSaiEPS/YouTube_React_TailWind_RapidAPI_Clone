import React from 'react'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { categories } from './Constants';
import {useDispatch,useSelector} from 'react-redux'


const SideBar = ({setsidebarOpen}) => {

  const dispatch=useDispatch()

  const selectcategoryName=useSelector(store=>store.info)
    // console.log(selectcategoryName)
    let SelectedName=selectcategoryName?.selectCategory || selectcategoryName?.state?.selectCategory
    
  let handleDispatch=(name)=>{
      // alert(name)
      dispatch({
          type:'selectCategoryAction',
          payload:name
      })


  }
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
    flex
    flex-col
    '
>
  {categories.map((items,index)=>(
    <div key={index}
    className={`flex
    pl-[2px]
    mt-[10px]
    cursor-pointer
    w-[220px]
    items-center
    ml-[5px]
    bg-primaryBlack
    min-h-[65px]
    rounded-[5px]
    justify-center
    hover:bg-primaryRed
    duration-1000
    ${SelectedName===items.name &&
      'bg-primaryRed'
  }

    `}
    onClick={()=>{
      handleDispatch(items.name)
    }}
    >
      <span
      className='pr-[2px]'
      
      >{items.icon}</span>
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
