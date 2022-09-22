import React, { useEffect, useState } from 'react'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { Avatar } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Languages } from './Languages';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HistoryIcon from '@mui/icons-material/History';
import { auth, db } from '../Firebase';
import { useSelector } from 'react-redux';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import Header_InputHistory from '../Header_InputHistory';
import Themes from '../Themes';

const Header = ({setsidebarOpen}) => {

  let [moreLog,setMorelog]=useState(false)
  let [showInput,setShowInput]=useState(false)
  let navigate=useNavigate()
// let selectUserData=useSelector(state=>state?.info?.usersData)

  const [input, setinput] = useState({
    text:'',
    mic:'',
    micOpen:false
  })


  let {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

let selectUserData=useSelector(state=>state?.info?.usersData)
// console.log(selectUserData)
let selectThemeData=useSelector(state=>state?.info?.themeWhite)

 

let handleSubmit=(e)=>{
  let date=new Date
let originalDate=(date.toLocaleString())
// console.log(originalDate);
    e.preventDefault()

    if(input.text){
    // alert(`searching for ${input.text}`)
   
    navigate(`/search/${input.text}`)

    // setinput({
    //   ...input,
    //   text:''
    //  } )
    let search=input.text;
    
    window.scrollTo(0,0)
    db.collection('users').doc(selectUserData?.userid).collection('searchHistory').add({
      search,
      originalDate
    })
    
    }
     else {
      setShowInput(true)
      alert('type somthing to search')
     }
  }
  let handleInputKeyPress=(e)=>{
    // console.log(e.keyCode===13)
    let date=new Date
    let originalDate=(date.toLocaleString())
   
    if(e.keyCode===13)
    if(input.text){
    let search=input.text;


      navigate(`/search/${input.text}`)
  
      
      window.scrollTo(0,0)
      db.collection('users').doc(selectUserData?.userid).collection('searchHistory').add({
        search,
        originalDate
      })
     
      
      }
       else {
        setShowInput(true)
        alert('type somthing to search')
       }

  }

  let handleChange=(e)=>{
    let nam=e.target.name
    let val=e.target.value
    setinput({
      ...input,
      [nam]:[val]
    })

  }

  let handleMic=()=>{
    let micsituation=input.micOpen
    setinput({
      ...input,
      micOpen:!micsituation

    })

    if(!input.micOpen){
      SpeechRecognition.stopListening()
    resetTranscript()

  setLanguage({
    ...language,
    code: 'en',
    name: 'english'
  })

  // SpeechRecognition.stopListening()
  //   resetTranscript()

  

    }
  }

  // let [micopen, setMicopen] = useState(true)

 

  let [language, setLanguage] = useState(
    {
      code: 'en',
      name: 'english'
    })

if(input.micOpen){
  SpeechRecognition.startListening({
    continuous: true,
    language: language.code,
  })

}



  let handleLanguage=(e)=>{
    // console.log(e.target.value)
    let targeted = (e.target.value)
    // console.log(targeted.split(' '))
    let targetteddata = targeted.split(' ');
    // console.log(targetteddata);
    setLanguage({
      ...language,
      code: targetteddata[1],
      name: targetteddata[0]
    })

  }

  let handleMicSearch=()=>{
    let date=new Date
let originalDate=(date.toLocaleString())
    setinput({
      ...input,
      text:transcript,
      micOpen:false

    })
    setLanguage({
      ...language,
      code: 'en',
      name: 'english'
    })
    navigate(`/search/${transcript}`)
    let search=transcript;

    SpeechRecognition.stopListening()
    resetTranscript()

    db.collection('users').doc(selectUserData?.userid).collection('searchHistory').add({
      search,
      originalDate
    })

  

  }

let [handleSearchHistory,setHandleSearchHistory]=useState(false)
 const [clike, setclike] = useState(false)
// let selectUserData=useSelector(state=>state?.info?.usersData)
const [searchHistory, setsearchHistory] = useState([])

useEffect(()=>{



db.collection('users').doc(selectUserData?.userid).collection('searchHistory').orderBy('originalDate','desc').onSnapshot((data)=>{
  setsearchHistory((data.docs.map((item)=>({
    id:item.id,
    data:item.data()
  }))))
 })
},[handleSearchHistory])


// console.log(searchHistory,selectUserData?.userid)



return (
    <div
    className={
        `flex flex-row sm:flex-row
         bg-primaryBlack text-white justify-between p-[20px] 
        py-[20px] items-center
        sticky
        top-[0px]
        z-[2]
        border-b-[1px]
        `
    }
    >


   <div className='flex'>
    <ViewHeadlineIcon
    onClick={
        ()=>{
            setsidebarOpen(true)
        }
    }
    className='cursor-pointer'/>

   <Link to='/'>
    <img 
     src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdsAAABqCAMAAADDRQtiAAAA1VBMVEX/////AAAoKCgiIiIAAAAlJSUgICBCQkLo6Ojs7OwqKioVFRUeHh7e3t7AwMBycnI9PT1hYWHMzMwMDAxSUlKgoKD/MzP/kJD/6Oj39/eEhIRXV1cSEhIZGRldXV3h4eH/yck0NDSzs7P/8PD/wMBqamr/2tqSkpLS0tL/9PQwMDDExMRISEi5ubmqqqr/6en/1dX/ExN/f3//r6//h4f/T0//ISH/uLj/PT3/oqL/b2//gID/RET/w8P/WFj/Z2f/Nzf/KSn/mpr/eHj/YGD/jo7/qanbmKRrAAAQzklEQVR4nO2de2OaPhfHeYSoKNYLakWl3ua1am9ru25dt2777f2/pAdByDkhURQouPb7pyCQfHI5SU5OJOkgzUejUWty3Xf0/fHu00Z/z1n9ci58+vR9c9/19WQyaV1Z/z3sbR+KT/PRVas1eXw6//z58+8fL/fPX5qWHm7+d6huLD28Wv/98nz/8ufrt/O/j/1Jq3U1TzqF71L9J4vm/ZfXwzkeoNf7H98+nz9Okk7su9Hk8etDnEB5enh56ied7n9e88fnWGvqDv18ep8ttLoeQhlxvad/nxBYW18+xZWuNKukdKl0RY3nLfPfSZLd6Mc7NKRLSgZIjoft5EvSaK2OV2RX5ZF4GbD/jnBS84F10Mvfgu3kNWmwGwngGuNKjqoy9vdKJXhDbrCOOnuMOnrBLlU6hwB6A7atNzeO+bppcT9v2iVUcqbnu2GowBuKtajzx6hkSUBlK+liO0pBg+yoyf2+WhHmgO5HV9bAdVKIPIOMCskEFMmli+23pJFS/eJ+oAmz1pz6rudkcD07jjyDTpftddJAobit8kUWsrtgL+cLMOv1VeQ5dLpsEx3XsvrB+8JhF+ZehTWmzlCTvChFnkMnyzZV1fZ/NzxbeQYrJsnMmMsN2B/LF9HP7pws289J48R64nyiUYcdapFtdMewyTbbUWfQ6bId/UyaJtYD7yPb5i56Msx5ha3VEehU2U6ShsmKN/V4qcMsqOOLPZhBZBHDhPupsv2bNEtWd5yPVFHV1PFFZGlp5YjzZyNjoMlQDE54SUvT3MWfpFmy+sz7StSlMs0uarCLkU84SptZzw5UHaNdomvjFLFNzZyUqz+8r0SmcLEBLxkXsB51/TOSEciAkkqo4lqmHb58gOJlm5apZKrXK85nzmAmYGOqN4ADpEW02cMVw/YsxJNiZdtPGqVf3Kkp2KfKHVg5ZtDOimME5NOpsH1MmqRf17zvhMsBhOTBlSlqriNfA+LoVNg+JU3SL97shbSCBNFSUBWYWaSS5/05Yp0K269Jk/TrGzcXFqBXhUtBaOwZwxoQ71tOhO1z0iT94hrKUgdkaLZKf59lAFtsQcelU2GbNEiO7rkfOgWjWJKjxhRurGMZAbH6YHu0fnJ9leEoiBTo7AWcuZCXsXn4Qp0I23nSIDl64A6CVNivgqUg6HPBccmIQyfCNsRKwUNcXfUNdxCERkEUogFzR+dls2GoqnrgfNFuvQFbY+M1q+7/ZjtxKv/G78cj+Nm6i44nUp+bjDXoWOWl+2sNzlwobBrVVaNcr1cKhXp93F5H5ZARE1visa21O5muUiSd9s4Fy1rjtrpJXGFZH0+HvtFfCDzNK2l+Hh1QIP72kTzMB8X9FU40M4t/6rCj6EVNljeOrXLW7CqLqd/WmnWqQBdD+vcyvFAFE15Ctr0xehboIW7Rs7yRGrfenlUU0173IrKpdER0a7eKsk3cNnW5NS7aIaYumptusfUjOqSeHvmpgfPG3lIQbKnRCMhYV4pw8ciuGcXFlK3aNSULpNNH5AcauFAEHnhCtiUZ/QUsN9ZNcEGTd7BVyyby2pS5C1ulqgxXv5y/FytDeE+Iitd0TJ5+MzqoW/3ls4UWsbuUpy5BRsigjM/qOm89neh1puqiRh0WjzxakIdDajFb5HAJl5KRUxD1oMZssxbbUo5hRnQEzNG6oPFSJ+vQmAzhLNV0zdmnqHd2/sdnewZS7a4J9FAnDEa9XbbOejnOuNKliK1Vb0sZ33cT2Wcn3HLL7UY6mJgL4XbusZVGEbvT/eazzYNGWa47HFeADMjLM2Hirb+ayOpIEdusahQYnw77OeDVtqa6/ybva2jNDTGd3ATD0OuX6MiKJh3RtCORHUCwnaZO56UBJ4toFtZhn5sitiRf9nWi9hvw4haaifNJcW+eh/CoaaIphu8RrvE/C9hCm3ibBITbGx52NE6iqbpwkTc9bMmiAVepqcxbmAtqZVfBpYvb8xB7CprM9NFTZHRfBWxLIOnO7AWcrMp6mzeHbOlnGmg4ZZkitpmCoCMhGpywauPUEWsUhH5wba9RiLkllq10FdV64Y2ALTSKnbyucdeAFjixplzQsIWiAYsjRWxtyUXTN3aDW5yMLnwHMQfL3ALRljtbtiEGMD620YXMELCVbmlb6xjF0H3VG/Ke4U7MbNdml1Xc2um0IqSLLdGX67PVuMuUTtCJrNHeqMVmOqp0i37btkpXr5GylaRPkexSELEFKJ0UgJkLYrp3IX/XjHZp/9hAXTBAmCq2RHYa1DXuUmVq/WGvzuJ2sD6FcLem8lWIoSmXrTT6FcFoV8RWBVlhZynIfi8ne6h79Yo8Ig4yK01sybYgWi0UambB3sQ8NJK9JRO0SLadem2FAMBnG8k0pIgtXNCzSydk7fZJawTLi+tTQ9moeGPcNLGlb+/hC7pn/CFTWvYGR7ewWVJiY2uNdsN2u0K2YBS0MRkAF1q0q6iCegtG2MLqerO0KWILd4130Dvo546R5593O+qFHcsjHraSdBduklkYJO6SpoxoGLW7BmTkYP6CaRpUtDVvyJgitl0wczxFjbLXs+D5c7ruhVLhPCcutiGnIYVRxFQw7agYcKjndT0lXD8vvf+u8Q7sFLI1wTB2iCafPP9NlDrwAtSGOwU6NrbWo0OMdsVPBg2uXjNAw+X1SHBFAc1SrNCFnNvhpogt9KmZIbveq6EoZA8cGvn31MTI1hrtHj0xIn4y6FeKa5UWYrrtFcfGGNA1lBnKXuJCTynbPHqH17PiPW9gRQ8+KFuOna00P3blXxxUuUSLszntUSw0H9GUHNxnMMPWScrZGmgmkQy2PyOjAfbP8M3OlHK8bC26x60hitmCZjg7Bj0oNSQZM5ku+aioI/am8VLKVsJsFyondZDtAA1wN3eHCYgQhO2Ro12+o6MtWi1JrkwTSsPTwkRabGl2qQWuAZ1WtigdpLBtf1CUNBFbYu/dj7veHsm2L37eGXddGoz0FsHYehmfVraIIsls7QYUG0LI1i4JKW2T++InGly2wKrAuQU8Hxm27gA3PWwJYlvHxtTWPEBLHl3gJvfWbI+2pXa0ybjH8bKRDmMx2w79I2ZLRxWpYYvrLZ6Y2rr5GYgtXPp7Y7bHj4F2HT7S4HiUkIGXK8a/whbFsHRnjvOILYzpgrrnYsxsw8xd7GJb49RbMBHb+1fY4pXK7JYtKtgKcIBEbJXN0l9K5xx3lhqUCkeg4zllttkdbC9TwzbkWsHOUynKfke3LE3kKbPdUW+1tLANvca387Cglc9Sdsbq/xhbXISPYBu930W8a/M2vQXbKMM58/fElgyoUIY4bEP4nSbgU2PL8I2CdDoCeldsM+AMDD/b0WvEbB9j9YVzNGXdj3WwT+BdsRXJYRsimmMCPqyOUPw/Jts/2G5ks52n0vd8D1uD2SeAQq9+sM24bEPs0Ypvzwg39Lkw2Wjb7QfbjWy2UgibNr69Xj/3sF0z1iK89sE247INcXpmfHs0+cHDQN7iYT2KdP6u2IoOjnPYRrFvPvK91dwzgqCQyc9EU35HbInoBMhFPiq2kcdE4Abr/GDrY6vsDqqUylgm3CC7UP8o2x1rBcewPaUYRFT/KNswa3wcnVDssGBsS6fLFvvUVLlshWvzHIU4ruCtY/4B7WAb2KfGvZIetrhNDuBTA/2lOEpjrM6d7lK2grMV+8Kl3c8R/4Nsm1/MlhNVDCouPiEkOHYeKDjb0/VhRW8nhe0GefSxJ8i2udPtYqNdbIP6nrsQ08oWPcrbV4A2oEK2Rqnni7Qb9dg0AonCSwVji3JRzPbE9owMeM+BbGeDQS5Xr1fL5el0vbWxUngWxUsotsi+hKdaltC/vGNoUsQW2lIqNqVy25/Lor1el5oTa1fTTFPZ7tYNMaEclwThHAOyRSv34j2aBfdCitiK9996TroNbigTCUUU8HZip/Dsp1+h2K54sZY2OnvrvdXwsKKD6+2KHxPhssv7lUm2++IUntnWD8X2EhV4k7pSoSgDFFUNDStAVTiG7UL0l4PrLd4+4Y1kZ7D0wMID1z3dBuNUzloMzLaEDGUwvEebrkEsE5SJoB0NzRbEyDmcLQoRRiM+5KGhDEfvcNO1myPpOyP1gXdGanC2EozkApGgTY90m5QgsMSuSig+rwCfXe5FqpOMJR6t8tmCkJx51FOQgResHcUgotug0NDP61hSd7bxy07P8/1s8eKYd345XkSgAR1xH5kpeoPEMbZmgrBVEUIwlz9FzxLGqaEdwpQJv+l9FWqraeywHiwLnv18GmeSH8AW7zvwKihCDmL+MXXNyxcmuHggtgaeBPZYDZnQfqLY2Fm3B6lhdz+QxBI67dfrWVBZ8MpUXBP+R0twEkVgtiqOJrBwuqohjtVJu2GGBxnYdaF2wXgmBWLLtBlEtgtWqczschHHc+y2e1ahM1Zoezw60wp/rrI1FS/RGMA7xiRMyItYtHc2eQ9bHMslI1caqlpqY8/7LpieY70mB9NGuyqzexeCsWXc4gm5bUzHBV+obnGMXbPSKZc7zCEiJAs+FzXKZNHIq2p+KhhXh3FRjkX70e5hW2MqQ1FRFBO3cfCY3ClTQ4lZNG2yBNaeYGzZaBxEs55FbDzB2Fov1TQ2Zj3y9sObx0lRXxSY1IEgAvGsrx+tvc5Se9lK1d3HFVilHZ4RxIk97tyVKQHqwdgaWf/mYOcjz8AoSNjfCv5cBPudfDHtff/SQMTPlDXK/fBsZ7Igk7ZCJyRZ4xP+2Q7dKVxnC8aWtznY/sYxCuMt8LtYcraNZza9Ckpdj3+X9xQNemOkylLevwi0n+3OA3Ssgt3Bi2G8CBpO2DEwmAzI1r852M5vUoJvEbDtrtrcc0bYZdq1oKFxhAvuddI8ofpRsJXK/MNYHEqEWec0TE5FsP23AY+AbKUcL4zOxpw928tWUY06p9oj48DW7a6zn5i7I3YdD6MAg9sgbI2xcHOFufR5kA39OSqTDbHV4Wxn/k6TaA37Av2By3bzq1rxfYqcg6u6joSpI2aZuTXMKUHR6nX/nFQgtpbF4TuIxcmpbtV3TiynImjEHpnWKMSgbKUG22JmnSlA0E3y2drWcL7OjqtNjqOq0S5ybQQNnSTqaJQW74tAYQQlScvKVF0uW6lWV9izJomm5PguRm0FTULrVaeu9Aayu8UGHopX0mSw+YY9LHutoGih+nILJ5d1/yFnvCcpNB3bGbQp/GxZqfN9kGs5nU2dbOpj//G+VpebCrg3fW46/LqA6vjLqqPL25zedU//zWpdPVe+FJ3yvap3TQdYtqhV3TGH0fF23FRAY9dDm28Gl8yzZlWz6DxLNosdrzCV6e4db4GoV6fpqG4plsoD3czKZHNe8XIoPJZ8Zd/mlhatay7bAlf06+h3fhyuvb6rrgws4X352fD2ol6xVL+4Hc44rTF9ZK1dHywWg0q1AbJoc+r7VrDXyyP53m/MphebZw0upjOD9yz6Idxk9Fbt6rKyrE5r/q4WqFdrVysV+6M75eFMfO9VpLssj9HL/rW9mGWoPlfB4xXls3bJ+uj9N90lOvn4fBd/NrxjzR+fk+p2nx+DGcgfOl7XTwlU3udfgTvaD4XT/Pruv9/3X15jrsM3r1/uv/53d713E8GHItZ8dNVqtSb9x6fzb1//vNw//2w2m68PNzdHEbf+dvPa/Pl8f//n67fzp8f+xHr41eijHU6H5qORhXsymVz3HX3/9PdcrF9/P9n6vrn12vrbpPWB8i31f7vrDWzfkirMAAAAAElFTkSuQmCC'
    alt='youtube img'
    className=' w-[100px] cursor-pointer rounded-[1px]
    hidden ss:block
    '
 />
    </Link>

     </div>


   <div  className='flex  
   ' >
    
    <form
    className='
    xs:mr-[15px]

    sm:w-[450px]
    max-w-[95%]
    flex
    items-center
    relative
  p-[7px]
  xs:p-[0px]
  xs:border

    ' 
    onSubmit={handleSubmit}

    >
      


      <input 
      placeholder='Search'
      className='max-w-[90%]
      sm:w-[400px]
      box-border
      p-[7px] 
      text-black
      outline-none
      pr-[30px]
      hidden
      xs:block
      
      '
      name='text'
      value={input.text}
      onChange={(e)=>{
        handleChange(e)
      }}

      onFocus={
        ()=>
          setHandleSearchHistory(true)
        }

        onBlur={
          ()=>
            setHandleSearchHistory(false)
          }
          autoComplete='off'
      
      />
      {
        input.text &&
      
      <span
      className='absolute
      top-[5px]
      text-black
      right-[55px]
      cursor-pointer
      '
      onClick={()=>{
        setinput({
          ...input,
        text:''
        })

    

      }}
      >
      <ClearIcon/>
      </span>
}
      <span
      className='
      justify-center
      flex
      ml-[12px]
    cursor-pointer 
   
    xs:block
    hidden

    '
    type='submit'
    onClick={handleSubmit}
      >
      <SearchIcon/>

      </span>

      <span
      className='
      justify-center
      flex
      ml-[12px]
    cursor-pointer 
    block
    xs:hidden

    '
    onClick={()=>
      setShowInput(true)
    }
      >
      <SearchIcon/>

      </span>



{
  (handleSearchHistory || clike)
 
  
  &&

  <div

  className='
  w-[100%]
  border
  absolute
  top-[38px]
  left-[0px]
  max-h-[65vh]
  overflow-y-auto
  xs:block
  hidden
  
  '
  
  >
    {
      searchHistory.map((items,index)=>{
        return(
         <div
         key={index}
         className='bg-primaryBlack
         p-[5px]
         
         '

        //  onTouchStart={()=>{
        //   setclike(true)
        //  }}
        //  onTouchCancel={()=>
        //   setclike(false)

        // }
        onMouseEnter={
          ()=>setclike(true)
        }
        onMouseLeave={
          ()=>setclike(false)
        }
         
         >
          
   

<Header_InputHistory
id={items.id}
search={items.data.search}
index
/>
          </div>

        )
      })
    }
  </div>
}
     
     
    </form>
    <span
    className='bg-dimWhite
    w-[45px]
    rounded-full
    flex
    items-center

    justify-center
    '
    >
    <KeyboardVoiceIcon
    className='cursor-pointer
    text-primaryGreen
    '
    onClick={handleMic}
    />

    </span>

   </div>




<div
className='
w-[60px]





'
>
<Themes/>
</div>


   <div
   className='relative
  
   '
   >



<Avatar
  className='cursor-pointer

  
  '
  onClick={()=>{
    setMorelog(!moreLog)
  }}
 
>
<span
className='

text-primaryBlue
font-bold

'
>
{(selectUserData?.userName) && (selectUserData?.userName)[0]}
</span>


</Avatar>


{moreLog &&
    <div
    className='absolute
    right-[10px]
    bg-primaryBlack
    flex
    flex-col
    border
    w-[200px]
  
    items-center
    p-[3px]
    '
    >
      <span
      className='cursor-pointer'
      onClick={()=>{
        setMorelog(!moreLog)
    auth.signOut()
    navigate('/')
    window.location.reload()


      }}
      >Logout</span>
    
    <Link
    to={`/history/${selectUserData?.userid}`}
    onClick={()=>{
      setMorelog(!moreLog)
    }}

    >
      <HistoryIcon/> <span
      className='cursor-pointer'
      
      
      >History</span></Link>
    </div>}
   </div>

{input.micOpen &&
   <div
   className='absolute
   top-[0px]
   left-[0px]
   bg-primaryBlackOpcity
   
   w-[100%]
   h-[100vh]
   z-[7]
   
   
   

   
   '
  //  onClick={handleMic}

   >

    <div
    className={
      `
     ${
      selectThemeData ?
      `bg-primaryWhite
      text-black
      `:
      `bg-primaryBlack 
      
      `
     }

    
    w-[700px]
   min-h-[400px]
    m-auto
    mt-[20px]
    max-w-[90%]
     relative
     top-[50px]
     pb-[5px]
     border
     `
    }
    >
    <div
    className='
    w-[90%]
    m-auto
    pt-[10px]
    '
    
    >
      <div>
        <div
        className='flex
        pt-[15px]
        '
        >
          <span>
          Search with your voice in
          </span>
          <h1
          className={`
          pl-[5px]
         
          text-black
          
          `}
          >
            
        

<select onChange={handleLanguage}>
{Languages.map((item,index)=>(
               <option
               key={index}
               >
               {item}

             </option>))
             }
              </select>

            
            </h1>
       

        </div>
        <h1
        
        className='
        pt-[15px]
        '>To search by voice, go to your browser settings and allow access to microphone</h1>
        </div>


        <div
        className='flex
        justify-around
        mt-[15px]
        
        min-h-[200px]
        '
        >
          <div
          className='flex
          flex-col
        
        w-[65%]

          '
          >
            <span>Listening... Try speacking in {language.name}</span>
           
           <span
           className='mt-[5px]'
           >
          <b>{transcript}</b> 
           </span>
           
            </div>
            <div
            className='w-[35%]'
            >
             
             <img 
             src='https://mir-s3-cdn-cf.behance.net/project_modules/max_632/0f4eed26719057.5635a060dc9e1.gif'
             alt='mic png'
             />
            </div>

           
          </div>
      </div>

      <div
      className='absolute
      right-[10px]
      top-[5px]
      cursor-pointer
      '
   onClick={()=>{
    handleMic()
  
  SpeechRecognition.stopListening()
    resetTranscript()
  }}

      >
      <ClearIcon
      
      
      />

        </div>

        <div
        className='
        flex
        justify-center
        mt-[10px]
        '
        >

        {
            transcript &&

            <button
            onClick={handleMicSearch}
 
            className='
            
            text-white
            w-[85px]
            p-[7px]
            hover:bg-primaryRed
            bg-primaryBlue
            duration-1000
            rounded-[5px]
            '

            >Search</button>

            }

            </div>

      </div>
   </div>

}
{showInput
      &&
<div
className='xs:hidden
absolute
top-[5px]
left-[10px]
bg-primaryBlack
w-[95%]
h-[90%]
m-auto
flex
flex-row
items-center
justify-around
'
>
  <span
  className='w-[10%]'
  >

<KeyboardBackspaceIcon
     
      onClick={()=>
        setShowInput(false)
      }
      className='cursor-pointer'
/></span>

      <span
  className='w-[90%]
  relative
  '
      
      >
      <input
      placeholder='Search YouTube'

      className=' xs:hidden
      w-[100%]
      box-border
      p-[7px] 
      text-black
      outline-none
     
      '
      name='text'
      value={input.text}
      onChange={(e)=>{
        handleChange(e)
      }}
    onKeyDown={handleInputKeyPress}

    onFocus={
      ()=>
        setHandleSearchHistory(true)
      }

      onBlur={
        ()=>
          setHandleSearchHistory(false)
        }
      
        autoComplete='off'
      />
      {input.text &&

<ClearIcon
className='absolute
right-[5px]
top-[7px]
text-primaryBlack
cursor-pointer
'

onClick={
  ()=>setinput({
    ...input,
    text:''
  })
}
/>}



      </span>

      {
  (handleSearchHistory || clike)
  
  &&

  <div

  className='
  w-[100%]
  
  absolute
  top-[75px]
  left-[0px]
  max-h-[65vh]
  overflow-y-auto
  
  
  '
  
  >
    {
      searchHistory.map((items,index)=>{
        return(
         <div
         key={index}
         className='bg-primaryBlack
         p-[5px]
         
         '

        //  onTouchStart={()=>{
        //   setclike(true)
        //  }}
        //  onTouchCancel={()=>
        //   setclike(false)

        // }
        onMouseEnter={
          ()=>setclike(true)
        }
        onMouseLeave={
          ()=>setclike(false)
        }
         
         >
          
   

<Header_InputHistory
id={items.id}
search={items.data.search}
index
/>
          </div>

        )
      })
    }
  </div>
}


</div>
}
    </div>
  )
}

export default Header
