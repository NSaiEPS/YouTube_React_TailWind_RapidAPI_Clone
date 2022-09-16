import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import { fetchFromAPI } from './FetchAPI'
import Videos from './Videos'

const WatchVideos = () => {
    const {id}=useParams()
    const [videoDetail, setVideoDetail] = useState([]);
  const [videos, setVideos] = useState([]);
    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
          .then((data) => setVideoDetail(data.items[0]))
    
        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
          .then((data) => setVideos(data.items))
      }, [id]);

      console.log(videoDetail)
  return (
    <div
    className='bg-primaryBlack
    
    flex
    justify-between
    '
    >
        {/* {id} */}
        <div
        className='
       border
       w-[70%]

        '
        >
    <ReactPlayer 
    url={`www.youtube.com/watch?v=${id}`}

    controls
    className='
       '
    />
    </div>
  <div
  className='
  h-[95vh]
  overflow-y-scroll
  w-[30%]
  '
  >


    <Videos
    videos={videos}
    direction='column'
    noScale={true}
    />
  </div>

    </div>
  )
}

export default WatchVideos