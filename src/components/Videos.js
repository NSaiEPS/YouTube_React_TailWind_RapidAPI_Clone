import React from 'react'
import { Link } from 'react-router-dom'

const Videos = ({videos,direction}) => {
  return (
    <div
    className={`flex
    flex-wrap
    justify-around
    ${direction &&
    'flex-col'
    }
    `}
    >

        {videos.map((items)=>{
            let reqdate=(items?.snippet?.publishTime).split('T')[0]
           console.log(items)
            
            return(
            <div key={items?.snippet?.publishTime}
            className='border
            h-[275px]
            w-[309px]
            mt-[15px]
            cursor-pointer
            '

            
            
            >
              <Link
              to={`/watch/${items?.id?.videoId}`}
              >
               <div>
               <img 
                src={items?.snippet?.thumbnails?.medium?.url}
                />
                </div>
               
                <div 
                className='flex
                flex-col
                p-[5px]
                '>
                  {/* channel imag    */}

                  <span
                  className='text-white'
                  >
                    {(items?.snippet?.title.slice(0,50))}
                  </span>

                  <span
                  className='text-dimWhite'
                  
                  >
                    {
                    items?.snippet?.channelTitle
                    }</span>
                       
                                 {/* no.of views  */}

                                 <span
                  className='text-dimWhite'
                                 
                                 >
                                    {reqdate}
                                      
                                     
                                 </span>
                    </div>
                    </Link>
                </div>
        )})}
    </div>
  )
}

export default Videos