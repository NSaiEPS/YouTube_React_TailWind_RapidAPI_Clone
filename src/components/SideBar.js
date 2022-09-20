import React from 'react'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { categories } from './Constants';
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';


const SideBar = ({setsidebarOpen}) => {
  let navigate=useNavigate()

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

      navigate('/')
      setsidebarOpen(false)
      window.scrollTo(0,0)



  }
  return (
    <div
    className='flex 
    fixed
    top-[0px]
    h-[100vh]
    text-white
    w-[100%]
    z-[4]


    '
    >
    <div
    className='
    min-w-[250px]
    bg-primaryBlue
    pt-[10px]
    
    
    '
    >
        <ViewHeadlineIcon
    onClick={
        ()=>{
            setsidebarOpen(false)
        }
    }
    className='
    cursor-pointer
    ml-[25px]
    '
    />
 <span
 className='p-[7px]
 
 '
 >Main content</span>

<div
    
    className='overflow-y-scroll
    h-[95vh]
    flex
    flex-col
    mt-[15px]
    pb-[25px]
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
