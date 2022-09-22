import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from './FetchAPI'
import Videos from './Videos'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Alarm } from '@mui/icons-material'
import { db } from '../Firebase'
import { useSelector } from 'react-redux'


const WatchVideos = () => {
    const {id}=useParams()
    const [videoDetail, setVideoDetail] = useState([]);
  const [videos, setVideos] = useState([]);
  let [channelDetail, setChannelDetail]=useState([])
let selectUserData=useSelector(state=>state?.info?.usersData)


    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
          .then((data) => setVideoDetail(data.items[0]))
    
        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
          .then((data) => setVideos(data.items))

          
      }, [id]);

      useEffect(()=>{
  fetchFromAPI(`channels?part=snippet&id=${videoDetail?.snippet?.channelId}`).then((data)=>
      setChannelDetail(data?.items[0])
      )
      },[videoDetail])
    

      // console.log(videoDetail)
      // console.log(videos);
      // console.log(channelDetail)

      let reqDate=''
      reqDate= videoDetail?.snippet?.publishedAt?.split('T')

const [watchHistory, setwatchHistory] = useState([])



useEffect(()=>{
    db.collection('users').doc(selectUserData?.userid).collection('watchHistory').orderBy('originalDate').onSnapshot((data)=>{
     setwatchHistory((data.docs.map((item)=>({
       id:item.id,
       data:item.data()
     }))))
    })
 
},[])






 

const [watchList, setwatchList] = useState([])
const [watchId, setwatchId] = useState('')

useEffect(()=>{
  watchHistory.map((item)=>{
    console.log(item.data.watchedVideoid)
    let items=item.data.watchedVideoid
    setwatchList([
      ...watchList,items]
    )
    if(items===id){
     let reqwatchId=item.id
      setwatchId(reqwatchId)
    }
  })

},[watchHistory])



console.log(watchId,watchList)



      let handleStart=()=>{
        // watchHistory.forEach((item)=>{
        //   console.log(item.data.watchedVideoid)
        //   watchedList.push(item.data.watchedVideoid)
        //   if(item.data.watchedVideoid===id){
        //     reqwatchId=item.id
        //   }
        // })



        let date=new Date
        let originalDate=(date.toLocaleString())

        //  if(watchList.includes(id)){
          if(watchId){
          db.collection('users').doc(selectUserData?.userid).collection('watchHistory').doc(watchId).update({
            originalDate
          })

         }

         else {
        db.collection('users').doc(selectUserData?.userid).collection('watchHistory').add({
          watchedVideoid:id,
          originalDate
        })
      }
      }


      // console.log(videoDetail)




  
  return (
    <div
    className='bg-primaryBlack
    flex
    justify-between
    mt-[2px]
    
    md:flex-row
    flex-col
    '
    >
        {/* {id} */}
        {/* w-[calc(100%-30rem)] */}

        <div
        className='
       
       md:w-[calc(100%-375px)]
       w-[95%]
     

        '
       

        >

<div
        className='w-[100%]
        border
        
        '

       
    
    > 
      <ReactPlayer 
    
    url={`www.youtube.com/watch?v=${id}`}

    controls
   

      //  onClickPreview={handelClick}
      
      onStart={handleStart}

    width='100%'

       
    />

    </div>
    <div 
    className='text-white'
    >
      <h1
      className='text-2xl
      p-[10px]
      '
      >{videoDetail?.snippet?.title}</h1>

  <div
  className='
  p-[10px]
  '
  >
      <span
      className='p-[4px]'
      >        {(videoDetail?.statistics?.viewCount)
      
      
      } views
</span> 

      <span
      className='p-[4px]'
      
      >
        { reqDate&& reqDate[0]} 
      </span>

      <span
      className='p-[4px]'
      
      >
         {videoDetail?.statistics?.likeCount} likes
      </span>


      <span
      className='text-dimWhite
      p-[10px]
      '
      >{videoDetail?.snippet?.description}</span>


</div>
    <div
    className='p-[10px]
    flex
    
    '
    >
           <Link
                to={`/channel/${videoDetail?.snippet?.channelId}`}
               
               className='flex
               flex-col'
               >

      <span
      className='p-[5px]'
      >{videoDetail?.snippet?.channelTitle
      
      } <CheckCircleOutlineIcon
                   
      />
      
      </span>

      <span>
        {/* {channelDetail} */}
       {channelDetail?.statistics?.subscriberCount} subscribers
      </span>
      </Link>


     
      <span
      className='p-[10px]'
      >
        {videoDetail?.statistics?.commentCount} Comments
      </span> 
      </div>

    </div>
    </div>
  <div
  className='
  min-w-[315px]
  
  flex
  justify-center
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