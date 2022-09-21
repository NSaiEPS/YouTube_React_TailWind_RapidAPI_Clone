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






    // if(reqDatepost===getReqDate){
    //     return 'today at '
    // }
     
    // if(reqDatepost + 1 === getReqDate){
    //     return  'one day back'
    // }


    

    // if(reqDatepost-getReqDate > 365){

    //     return  'years back'
    // }

    // else {
           
    //     if(reqDatepost-getReqDate >35){
    //         return 'months back'
    //     }

    //     if( (reqDatepost-getReqDate <35)  )

    //     return `${getReqDate - reqDatepost} days back`

    // }


  }

//   console.log(reqDateCal())
  
  return (
    <div
    className='flex
    pt-[7px]
    '
    >
        <div
        className='w-[33%]'
        
        > {search}</div>


        <div
        className='w-[33%]'

        
        >{reqDateCal()} at {originalDate.split(',')[1]}
        
        </div>
        

        <div
        className='w-[33%]
        cursor-pointer
        text-primaryRed
        flex
        justify-end

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