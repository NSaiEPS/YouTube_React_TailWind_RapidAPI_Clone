import React from 'react'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ReactPlayer from 'react-player';
import { db } from '../Firebase';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


const WatchHistory = ({watchedVideoid,watchId,originalDate}) => {
    const {id}=useParams()

 
    let handleDelete=()=>{
        db.collection('users').doc(id).collection('watchHistory').doc(watchId).delete().then((data)=>{
            toast.success(`Successfully deleted from watch History`, {
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
    
    >{originalDate}</div>
    
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