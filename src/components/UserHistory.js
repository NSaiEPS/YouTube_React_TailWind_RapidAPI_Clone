
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../Firebase'
import SearchHistory from './SearchHistory'
import WatchHistory from './WatchHistory'
import 'react-toastify/dist/ReactToastify.css';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { tabsListUnstyledClasses } from '@mui/base'


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
       
   function handleSearchHistory(){
    let confm=(window.confirm("are you sure to delete all search History!"))
if (confm) {
  // alert('deleted')

  db.collection('users').doc(id).collection('searchHistory')
  .get()
  .then(res => {
    res.forEach(element => {
      element.ref.delete();
    });
  });
} 

   }


   function handleWatchHistory(){
    let confm=(window.confirm("are you sure to delete all Watch History!"))
if (confm) {
  db.collection('users').doc(id).collection('watchHistory')
  .get()
  .then(res => {
    res.forEach(element => {
      element.ref.delete();
    });
  });
} 

   }




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
        relative

      `}

      onClick={()=>{
        setHistory('search')
      }}
      >SearchHistory
      
      
      {
        history==='search' &&
        searchHistory.length >0
        &&

        <button
        className='
        absolute
        top-[0px]
        right-[-35px]
        p-[7px]
        text-primaryRed
        '

        onClick={
    handleSearchHistory

        }
        > <AutoDeleteIcon/>
        </button>
      }

      </button>
   

      <button
      className={`border
      bg-primaryBlack
      text-white
      p-[7px]
      relative
      ${history==='watch' && 
      'bg-primaryRed'

      
    
    }
      
      `}
      onClick={()=>{
        setHistory('watch')
      }}
      
      >WatchHistory
      
      {
        history==='watch'&& watchHistory.length>0  &&

        <button
        className='
        absolute
        top-[0px]
        right-[-35px]
        p-[7px]
        text-primaryRed
        '
        onClick={handleWatchHistory}
        > <AutoDeleteIcon/>
        </button>
      }
      
      </button>
      

     </div>
     <div>
      {history==='search'?

      (searchHistory.length >0 ?
      
      

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
        
        className='w-[33%]
        flex
        justify-end
        '
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
        
        className='
        bg-primaryBlue
        text-white
        w-[250px]
        m-auto
        mt-[15px]
        p-[10px]
        flex
        justify-center


        '
        >
          Empty! NO searchHistory .

          </div>
        
        )
     :


     (
      watchHistory.length>0 ?

     
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
      :

      <div
      
      className='
      bg-primaryBlue
      text-white
      w-[250px]
      m-auto
      mt-[15px]
      p-[10px]
      flex
      justify-center


      '
      >
Empty! NO watchHistory .
        </div>
      
      )

      }

     </div>
 
    </div>
  )
}

export default UserHistory