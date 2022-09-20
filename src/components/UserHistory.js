
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { db } from '../Firebase'
import SearchHistory from './SearchHistory'
import WatchHistory from './WatchHistory'
import 'react-toastify/dist/ReactToastify.css';


const UserHistory = () => {
    let {id}=useParams()
    const [watchHistory, setwatchHistory] = useState([])
    const [searchHistory, setsearchHistory] = useState([])

    const [history, setHistory] = useState('search')

    useEffect(()=>{
   db.collection('users').doc(id).collection('watchHistory').orderBy('originalDate').onSnapshot((data)=>{
    setwatchHistory((data.docs.map((item)=>({
      id:item.id,
      data:item.data()
    }))))
   })

   db.collection('users').doc(id).collection('searchHistory').orderBy('originalDate').onSnapshot((data)=>{
    setsearchHistory((data.docs.map((item)=>({
      id:item.id,
      data:item.data()
    }))))
   })


    },[id])
 
    // console.log(watchHistory,searchHistory)

  return (
    <div
    className='flex
    flex-col
    '
    >
    
     
     <div
     className='m-auto
     xs:w-[350px]
     w-[100%]
     flex
     justify-around
     pt-[20px]
     '
     >
      <button
      className={`border
      bg-primaryBlack
      text-white
      p-[7px]
      ${history==='search' && 
      'bg-primaryRed'}
      `}

      onClick={()=>{
        setHistory('search')
      }}
      >SearchHistory</button>


      <button
      className={`border
      bg-primaryBlack
      text-white
      p-[7px]
      ${history==='watch' && 
      'bg-primaryRed'
    
    }
      
      `}
      onClick={()=>{
        setHistory('watch')
      }}
      
      >WatchHistory</button>

     </div>
     <div>
      {history==='search'?

      <div
      className='flex
      flex-col
      bg-primaryBlack
      text-white
     sm:w-[750px]
     w-[98%]
     m-auto
     p-[15px]
     mt-[25px]


      '
      >
        <div
        className='flex'
        >
        <div
        className='w-[33%]'
        >Searched For</div>

        <div
        
        className='w-[33%]'
        >Searchded at</div>

        <div
        
        className='w-[33%]'
        >Delete Search</div>
        </div>
        <div
        className='
        pt-[15px]
        '
        >
             {
        searchHistory.map((item,index)=>(
          <div
          key={index}
          >

          <SearchHistory
          searchId={item.id}
          originalDate={item.data.originalDate}
          search={item.data.search}
          />
          </div>
        ))
}
</div>
        </div>
     :
     <div
     className='flex
     flex-col
     bg-primaryBlack
     text-white
   
     m-auto
     p-[15px]
     mt-[25px]
     sm:w-[750px]
     w-[98%]


     '
     >
      
       <div
       className='pt-[15px]'
       
       >

      {
        watchHistory.map((item,index)=>(
          <div
          key={index}
          >

      <WatchHistory
      watchId={item.id}
      originalDate={item.data.originalDate}
watchedVideoid={item.data.watchedVideoid}

      />
      </div>
     
        ))
}
      </div>
      </div>

      }

     </div>
 
    </div>
  )
}

export default UserHistory