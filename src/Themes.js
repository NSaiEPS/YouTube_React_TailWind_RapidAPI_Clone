import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Themes = () => {

  let dispatch=useDispatch()
let selectThemeData=useSelector(state=>state?.info?.themeWhite)
console.log(selectThemeData)

    let handleDarkTheme=()=>{
        // alert('dark')
        dispatch({
            type:'Themes',
            payload:
            false
            
          })
      
        
    }

    let handleLightTheme=()=>{
        // alert('whitew')
        dispatch({
            type:'Themes',
            payload:
            true
            
          })
      
        

    }
  return (
    <div
    className='flex
    border
    relative
    
    '
    >
    <div
    className='
    flex
    w-[100%]
    rounded-b-full
    cursor-pointer


    '
    >
 
    <div
    className={`
    
    bg-primaryWhite
    ${selectThemeData &&
    'bg-primaryGold'
    }  
    
    w-[50%]
    duration-1000
    rounded-full
    `}
    
    onClick={handleLightTheme}
    >

<button></button>

    </div>
    <div
    className={`
   
    bg-primaryBlack
    ${!selectThemeData &&
        'bg-primaryGold'
        } 
        duration-1000

    w-[50%]
    rounded-full
    border


    `}
    onClick={handleDarkTheme}

    >
        <button></button>
     
     
    </div>
 
   </div>
   <div
   
   className='
   text-[10px]
   absolute
   top-[25px]
 
   
   '
   >
    {selectThemeData ?
    'Light Mode':
    'Dark Mode'
    
    }
    
    
    
    </div>
   </div>
  )
}

export default Themes
