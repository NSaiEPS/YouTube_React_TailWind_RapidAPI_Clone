import React, { useEffect } from 'react'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ReactPlayer from 'react-player';
import { db } from '../Firebase';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const WatchHistory = ({watchedVideoid,watchId,originalDate}) => {
    const {id}=useParams()



// const [watchHistory, setwatchHistory] = useState([])

// useEffect(()=>{
//     db.collection('users').doc(id).collection('watchHistory').orderBy('originalDate').onSnapshot((data)=>{
//      setwatchHistory((data.docs.map((item)=>({
//        id:item.id,
//        data:item.data()
//      }))))
//     })
 
// },[id])
 
// let watchedList=[]

// useEffect(()=>{
//   watchHistory.map((item)=>{
//     watchedList.push(item.data.watchedVideoid)
//   })

// },[watchHistory])





    let handleDelete=()=>{
        db.collection('users').doc(id).collection('watchHistory').doc(watchId).delete().then((data)=>{
            toast.success(`Successfully deleted watched Video from watch History`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        }).catch(e=>alert(e.message))
        
 


        
    }
   
    




    let reqDateCal=()=>{
        let reqDatepost=originalDate.split('/')[0]
        let reqMonthpost=originalDate.split('/')[1]
        let reqYearpost=originalDate.split('/')[2].split(',')[0]
        let date=new Date()
        let getReqDate=date.toLocaleDateString().split('/')[0]
        let getReqMonth=date.toLocaleDateString().split('/')[1]
        let getReqYear=date.toLocaleDateString().split('/')[2]
        // console.log(getReqDate - reqDatepost ===1)
    
        if(getReqYear===reqYearpost){
            // Same year
            if(getReqMonth=== reqMonthpost){
                // same month
    
                if(getReqDate===reqDatepost){
                    return 'today '
                }
    
                else {
    
                    if( getReqDate- reqDatepost ===1 ){
                        return 'yesterday '
                    }
    
                    else {
                        return `${getReqDate - reqDatepost} days back`
                    }
                }
            }
    
            else {
                if( getReqMonth- reqMonthpost=== 1) {
                return 'last month'}
    
                else {
                    return `${getReqMonth- reqMonthpost} months back`
                }
            }
        }
    
        else {
            // Different year
            if(getReqYear ===reqYearpost -1){
                return 'a year back'
            }
            else return `${getReqYear-reqYearpost } years back`
        }
    
    }    



    let handleStart=()=>{
        let date=new Date
        let originalDate=(date.toLocaleString())
        db.collection('users').doc(id).collection('watchHistory').doc(watchId).update({
         
          originalDate
        })

      }

 
    return (
    <div
    className='flex
    flex-col
    '
    >
    <div
        className='w-[100%]
        
        '
    
    > 
      <ReactPlayer 
    
    url={`www.youtube.com/watch?v=${watchedVideoid}`}

    controls
    className='
    w-[95%]
    bg-primaryRed
    max-w-[95%]
       '

      //  onClickPreview={handelClick}
      
      onStart={handleStart}
      width='100%'

       
    />

    </div>
    <div
    className='flex
    pt-[25px]
    '
    >
    <div
        className='w-[50%]'
    
    >Watched At</div>

<div
        className='w-[50%]'
    
    >Delete Watched Video</div>
    </div>

  <div
  className='flex
  pb-[25px]
  pt-[5px]
  mb-[25px]
  '
  >
    <div
        className='w-[50%]'
    
    >
        
        {reqDateCal()} at {originalDate.split(',')[1]}
    </div>
    
    <div
        className='w-[50%]
        cursor-pointer
        text-primaryRed
        '
    
    >
        <AutoDeleteIcon
    onClick={handleDelete}

        />
    </div>
    </div>


</div>
  )
}

export default WatchHistory