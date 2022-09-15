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
    <div>
        
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
          className='font-[25px]
          text-2xl
          '
          
          >
            <span
            className='text-primaryRed'
            >
            {SelectedName} 
            </span> Videos
          </h1> 
          <div>

             
           {


            <Videos videos={videos}/>
           }
          </div>


        </div>
    </div>
  )
}

export default FirstPage