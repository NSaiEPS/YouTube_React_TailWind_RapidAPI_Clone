import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from './FetchAPI'
import Videos from './Videos'

const ChannelVideos = () => {

  let [channelDetail, setChannelDetail]=useState([])
  const [videos, setvideos] = useState([])
  const {id}=useParams()
// console.log(channelDetail,videos)

  useEffect(()=>{
  fetchFromAPI(`channels?part=snippet&id=${id}`).then((data)=>
  setChannelDetail(data?.items[0])
  )

  fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data)=>
  setvideos(data?.items)
  )

  },[id])
  let reqdate= (channelDetail?.snippet?.publishedAt) && (channelDetail?.snippet?.publishedAt).split('T')[0]

  console.log(channelDetail)
  
  // console.log(channelDetail?.snippet?.thumbnails?.medium?.url)
  return (
    <div>

      <div
        className='border
        h-[350px]
bg-primaryBlue

'
      >

<div
                  className='flex flex-col
                  w-[309px]
m-auto


                 
                  '
                  >
                 <img 
                src={channelDetail?.snippet?.thumbnails?.medium?.url}
               className='rounded-full
               w-[70%]
               m-auto
               
               
               '
               alt='img'
               />


                        <div
                        className='flex flex-col
                        items-center
                        text-dimWhite
                        '
                        >
                       <span>{(channelDetail?.snippet?.title.slice(0,50))}
                       
                       </span>   
                       <span>{reqdate}</span> 
                       <span>
                        
                        {channelDetail?.statistics?.subscriberCount} subscribers
                        </span>

                               <span>
                        {channelDetail?.statistics?.videoCount} Videos</span>

                        <span>

                        {(channelDetail?.statistics?.viewCount)} Views</span>
                        </div>
                        </div>

      </div>
    
    

   
    <div
    className='overflow-x-hidden'
    >
      <Videos
      videos={videos}
      />
    </div>
    </div>
  )
}

export default ChannelVideos