import React from 'react'
import { Link } from 'react-router-dom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VideoCard from './VideoCard';

const Videos = ({videos,direction,noScale,watchVideos}) => {

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

        {videos.map((items,index)=>{
            let reqdate=(items?.snippet?.publishTime).split('T')[0]
          //  console.log(items)
          
            
            return(
            <div key={items?.snippet?.publishTime}
            className={`border
            h-[285px]
            w-[309px]
            
            cursor-pointer
            ${!noScale  && 
            
            'hover:scale-125'}

            ${ (watchVideos &&
            index===0) ?'mt-[0px]':'mt-[15px]'
            }

    
    duration-1000
    
    bg-primaryBlue

            `
            }
            
            
            >

{/* <VideoCard  
noScale={noScale}
channelId={items?.id?.channelId}
Chthumurl={items?.snippet?.thumbnails?.medium?.url}
Chtitle={(items?.snippet?.title.slice(0,50))}
videoId={items?.id?.videoId}
reqdate={reqdate}
Vdthumurl={items?.snippet?.thumbnails?.medium?.url}
Vdtitle={(items?.snippet?.title.slice(0,75))}
VdchannelId={items?.snippet?.channelId}
VChtitle={ items?.snippet?.channelTitle}
/> */}


 
              {
                items?.id?.channelId ?

                <Link
                to={`/channel/${items?.id?.channelId}`}
                >

                  <div
                  className='flex flex-col
                 
                  '
                  >
                 <img 
                src={items?.snippet?.thumbnails?.medium?.url}
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
                       <span>{(items?.snippet?.title.slice(0,50))}
                       
                       </span>   
                       <span>{reqdate}</span>   
                        </div>
                        </div>
                
                </Link>
              
              :
   

              <Link
              to={`/watch/${items?.id?.videoId}`}
              onClick={()=>{
                window.scrollTo(0,0)
              }}
              >
               <div>
               <img 
                src={items?.snippet?.thumbnails?.medium?.url}
               alt='img'
                
                />
                </div>
               
                <div 
                className='flex
                flex-col
                p-[5px]
                '>
                 

                  <span
                  className='text-white
                  capitalize
                  '
                  >
                    {(items?.snippet?.title.slice(0,60))}
                    
                  </span>

                  <span
                  className='text-dimWhite'
                  
                  >
                    <Link
                to={`/channel/${items?.snippet?.channelId}`}
                >
                    <span>
                    {
                    items?.snippet?.channelTitle
                    } 
                    </span> <span
                     className='!font-[2px]
                     !font-light
                     
                     '
                    >
                    <CheckCircleOutlineIcon
                   
                    />
                    
                    </span> 
                    </Link>
                    
                    </span>
                       
                                 

                                 <span
                  className='text-dimWhite'
                                 
                                 >
                                    {reqdate}
                                      
                                     
                                 </span>
                    </div>
                    </Link>}
                </div>
        )})}
    </div>
  )
}

export default Videos