import React from 'react'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { useParams } from 'react-router-dom';
import { db } from '../Firebase';
import { toast } from 'react-toastify';

const SearchHistory = ({searchId,search,originalDate}) => {
    const {id}=useParams()
    let handleDelete=()=>{
        db.collection('users').doc(id).collection('searchHistory').doc(searchId).delete().then((data)=>{
            toast.success(`Successfully deleted "${search}" from search History`, {
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

    
    // console.log(reqDate)
  let reqDateCal=()=>{
    let reqDatepost=originalDate.split('/')[0]
    let date=new Date()
    let getReqDate=date.toLocaleDateString().split('/')[0]
    // console.log(getReqDate)

    if(reqDatepost===getReqDate){
        return 'today at '
    }
     
    if(reqDatepost-1 === getReqDate){
        return  'one day back'
    }

    if(reqDatepost-getReqDate > 365){

        return  'years back'
    }

    else {
           
        if(reqDatepost-getReqDate >35){
            return 'months back'
        }

        if( (reqDatepost-getReqDate <35)  )

        return `${reqDatepost-getReqDate} days back`

    }


  }

//   console.log(reqDateCal())
  
  return (
    <div
    className='flex'
    >
        <div
        className='w-[33%]'
        
        > {search}</div>


        <div
        className='w-[33%]'

        
        >{reqDateCal()}  {originalDate.split(',')[1]}</div>
        

        <div
        className='w-[33%]
        cursor-pointer
        text-primaryRed

        '
        
        >
            <AutoDeleteIcon
            onClick={handleDelete}
            />
        </div>
    

   
    </div>
  )
}

export default SearchHistory