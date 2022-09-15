import React from 'react'
import { categories } from './Constants'
import {useDispatch,useSelector} from 'react-redux'

const MoreInfoTop = () => {

    const dispatch=useDispatch()

    const selectcategoryName=useSelector(store=>store.info)
    // console.log(selectcategoryName)
    let SelectedName=selectcategoryName?.selectCategory || selectcategoryName?.state?.selectCategory
    
    
    // console.log(SelectedName)
  
    let handleDispatch=(name)=>{
        // alert(name)
        dispatch({
            type:'selectCategoryAction',
            payload:name
        })


    }
  return (
    
<div
    
    className='overflow-x-scroll
    w-[95%]
    m-auto
    mt-[10px]
    hidden
    ss:flex


    '
>
  {categories.map((items,index)=>(
    <div key={index}
    className={`flex
    ml-[25px]
    cursor-pointer
    justify-center
    bg-primaryBlack
    text-white
    h-[50px]
    items-center
    min-w-[200px]
    rounded-[5px]
    hover:bg-primaryRed
    duration-1000
   ${SelectedName===items.name &&
    'bg-primaryRed'
}
`
}
    
    

    onClick={()=>{
        handleDispatch(items.name)
    }}
    >
      <span
      className='
      pr-[5px]

      '
      
      >{items.icon}</span>
      <span>{items.name}</span>


      </div>
  ))}
</div>
  )
}

export default MoreInfoTop