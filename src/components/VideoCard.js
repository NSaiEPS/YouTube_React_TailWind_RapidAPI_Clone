import React, { useEffect, useState } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { fetchFromAPI } from './FetchAPI';
import { Link } from 'react-router-dom';


const VideoCard = ({noScale, channelId,Chthumurl,Chtitle,reqdate,videoId,Vdthumurl,Vdtitle,VdchannelId,VChtitle}) => {
  let [channelDetail, setChannelDetail]=useState([])
  const [videoDetail, setVideoDetail] = useState([]);

  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${VdchannelId}`).then((data)=>
        setChannelDetail(data?.items[0])
        )

        fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
        .then((data) => setVideoDetail(data.items[0]))
    },[videoId])


  return (
    <div 
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

              {channelId ?

                <Link
                to={`/channel/${channelId}`}
                >

                  <div
                  className='flex flex-col
                 
                  '
                  >
                 <img 
                src={Chthumurl }
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
                       <span>{Chtitle}
                       
                       </span>   
                       <span>{reqdate}</span>   
                        </div>
                        </div>
                
                </Link>
              
              :
   

              <Link
              to={`/watch/${videoId}`}
              onClick={()=>{
                window.scrollTo(0,0)
              }}
              >
               <div>
               <img 
                src={Vdthumurl}
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
                    {Vdtitle}
                    
                  </span>

                  <span
                  className='text-dimWhite'
                  
                  >
                    <Link
                to={`/channel/${VdchannelId}`}
                >
                    <span>
                    {
                    VChtitle
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
                       
                                 {/* no.of views  */}

       
                                 <span>
                                 {videoDetail?.statistics?.viewCount} views
                                 </span>

                                 <span
                  className='text-dimWhite'
                                 
                                 >
                                    {reqdate}
                                      
                                     
                                 </span>
                    </div>
                    </Link>}
                </div>
  )
}

export default VideoCard