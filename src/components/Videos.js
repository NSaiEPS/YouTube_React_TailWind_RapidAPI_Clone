import React from 'react'
import { Link } from 'react-router-dom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Videos = ({videos,direction,noScale}) => {
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
          //  console.log(items)
            
            return(
            <div key={items?.snippet?.publishTime}
            className={`border
            h-[275px]
            w-[309px]
            mt-[15px]
            cursor-pointer
            ${!noScale  && 
            
            'hover:scale-125'}
    
    duration-1000
    
    bg-primaryBlue

            `
            }
            
            
            >

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
                  {/* channel imag    */}

                  <span
                  className='text-white'
                  >
                    {(items?.snippet?.title.slice(0,50))}
                    
                  </span>

                  <span
                  className='text-dimWhite'
                  
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
                   
                    /></span> 
                    
                    </span>
                       
                                 {/* no.of views  */}

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