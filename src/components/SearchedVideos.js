import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from './FetchAPI'
import Videos from './Videos'

const SearchedVideos = () => {
  const {name}=useParams()
  const [videos,setVideos]=useState([])

  useEffect(()=>{
  fetchFromAPI(`search?part=snippet&q=${
    name
  }` 
  ).then((data)=>
    setVideos(
      data.items
    )
  )
  },[name])

  return (
    <div
    className='bg-primaryBlack'
    >
       <Videos videos={videos}/>
    </div>
  )
}

export default SearchedVideos
