import React from 'react'
import HistoryIcon from '@mui/icons-material/History';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from './Firebase';


const Header_InputHistory = ({search,id,index}) => {
let selectUserData=useSelector(state=>state?.info?.usersData)


    let handleSearch=()=>{
        let date=new Date()
let originalDate=(date.toLocaleString())
db.collection('users').doc(selectUserData?.userid).collection('searchHistory').add({
    search,
    originalDate
  })

    }


let handleDelete=()=>{
    db.collection('users').doc(selectUserData?.userid).collection('searchHistory').doc(id).delete()
}

  return (
    <div
    className='flex
      
      pt-[3px]
    '
    >
        <div
        className='w-[15%]'
        >
        <HistoryIcon/>
        </div>
        <div
        className='w-[70%]
        cursor-pointer
        '
        onClick={()=>
            
       handleSearch
    
    }
        >
            <Link
            to={`/search/${search}`}
            >
            {search}

            </Link>

           
        </div>
        <div
        className='w-[15%]
        flex
        justify-end
        cursor-pointer

        '
        
        >
        <AutoDeleteIcon
        onClick={handleDelete}
        />

        </div>

    </div>
  )
}

export default Header_InputHistory