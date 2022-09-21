import React, { useEffect, useState } from 'react'
import MoreInfoTop from './MoreInfoTop'
import {useDispatch,useSelector} from 'react-redux'
import { fetchFromAPI } from './FetchAPI'
import Videos from './Videos'

const FirstPage = () => {

  const selectcategoryName=useSelector(store=>store.info)

  
  let SelectedName=selectcategoryName?.selectCategory || selectcategoryName?.state?.selectCategory

const [videos,setVideos]=useState([])

useEffect(()=>{
fetchFromAPI(`search?part=snippet&q=${
  SelectedName
}`).then((data)=>
  setVideos(
    data.items
  )
)
},[SelectedName])

// console.log(videos)
  return (
    <div
    
    
    >
        
        <MoreInfoTop/>

        <div 
        className='
        
        bg-primaryBlack
        text-white
        flex
        justify-center
        flex-col
        mt-[1px]
        '
        >
          <h1
          className='
          text-2xl
          m-auto
          p-[4px]
          '
          
          >
            <span
            className='text-primaryRed'
            >
            {SelectedName} 
            </span> Videos
          </h1> 
          <div
          className='overflow-x-hidden'
          
          >

             
           {


            <Videos videos={videos}/>
           }
          </div>


        </div>
    </div>
  )
}

export default FirstPage