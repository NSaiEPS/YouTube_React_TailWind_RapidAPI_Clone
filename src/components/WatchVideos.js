import React from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'

const WatchVideos = () => {
    const {id}=useParams()
  return (
    <div>
        {/* {id} */}
    <ReactPlayer 
    url={`www.youtube.com/watch?v=${id}`}

    controls
    />
    </div>
  )
}

export default WatchVideos