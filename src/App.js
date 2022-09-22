
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import ChannelVideos from './components/ChannelVideos';
import FirstPage from './components/FirstPage';
import Header from './components/Header';
import MoreInfoTop from './components/MoreInfoTop';
import SearchedVideos from './components/SearchedVideos';
import SideBar from './components/SideBar';
import WatchVideos from './components/WatchVideos';
import { useAuthState } from 'react-firebase-hooks/auth';
import Signup from './components/Signup';
import UserHistory from './components/UserHistory';
import { auth, db } from './Firebase';
import Spinner from 'react-spinkit'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
// import { Avatar } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import img from './'
import img from './No_Internet_Img.png'



function App() {


  const [sidebarOpen, setsidebarOpen] = useState(false)
  // document.addEventListener('contextmenu', function(e) {
  //   e.preventDefault();
  // });

let selectThemeData=useSelector(state=>state?.info?.themeWhite)

  let dispatch=useDispatch()
  const [userss,loading]=useAuthState(auth)



  const [usersData, setusersdata] = useState([])
  useEffect(() => {
   
    db.collection('users').onSnapshot((data)=>{
      setusersdata((data.docs.map((item)=>({
        id:item.id,
        data:item.data()
      }
      ))))
    })
   
  }, [])


  // console.log(userss?.email)


usersData.map((data)=>
{
  if(data?.data?.email===userss?.email){
    dispatch({
      type:'usersDataAction',
      payload:{
        userid:(data.id),
        userName:(data.data?.name),
        userEmail:(data.data?.email)
      }
    })

  }

})

  
  // if(data?.data?.email===userss?.email){
    let [arrowState,setArrowState]=useState('down')

    useEffect(()=>{
      window.addEventListener('scroll',()=>{
        if(window.scrollY>=150){
          setArrowState('up')
        }
        else {
          setArrowState('down')
  
        }
      })
  
    },[])

    let handelGo=(name)=>{
      if(name==='up'){
        window.scrollTo(0,0)
      }
      if(name==='down'){
        let len=document.body.scrollHeight
        // window.outerHeight
        window.scrollTo(0,len)
      }
    }

    // console.log(window.innerHeight,
      
    //   document.body.scrollHeight);
    

 if(loading){
  return (
    <div className='
    flex
    items-center
    h-[100vh]
    '>
    <div className='
    flex
    flex-col
    m-auto
    '>
     
      <img className='
      w-[550px]
      
      '  
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/800px-Logo_of_YouTube_%282015-2017%29.svg.png' alt='Devi restarent'/>
   
      <Spinner
        name='pacman'
        color='green'
        fadeIn='none'
        className='m-auto'

      />

    </div>
  </div>
  )
 }

  return (
    <div className={
      `
      ${!selectThemeData &&
      'bg-primaryBlack'
      }

      duration-1000
      `
    }
    
   
    
    
    >



      <Header  
    sidebarOpen={sidebarOpen}
    setsidebarOpen={setsidebarOpen}
    
    />
    {sidebarOpen &&
    
    <SideBar
    setsidebarOpen={setsidebarOpen}
    
    />

   

}



{
      !navigator.onLine ?
      <div
      className='flex
      items-center
      justify-center
      h-[75vh]

      
      '
      >
      <div
      className='w-[300px]
      m-auto
      flex
      flex-col
      '
      >
           <img 
           src={img}
           alt='no interetnet img'
           />

           <h2>Connect to the internet</h2>
           <span>You're offline. Check your connection.</span>

           <button
           className='
           text-blue-700
           border-blue-600
           border
           mt-[10px]
           px-[7px]
           py-[3px]
           mx-auto
           
           
           '
           onClick={()=>
          
          window.location.reload()
          }
           
           >RETRY</button>
        </div>
        </div>
    :
<Routes>


        <Route path='/' element={<FirstPage/>}/>
        <Route path='/search/:name' element={<SearchedVideos/>}/>
        <Route path='/watch/:id' element={<WatchVideos/>}/>
        <Route path='/channel/:id' element={<ChannelVideos/>}/>
        <Route path='/history/:id' element={<UserHistory/>}/>

       
    
      </Routes>
}

{!userss &&

  <Signup/>
}

<ToastContainer

/>

{/* 
<div
className='fixed bottom-[10px]
w-[50px]
right-[10px]
'
>
<div
className='bg-primaryBlack
text-white
py-[7px]

flex
items-center
justify-center
rounded-full

'
>


  <ArrowDownwardIcon/> */}

  {/* {
    window.scrollHeight>
  } */}

  {

window.innerHeight <
      
      document.body.scrollHeight
      &&

  

<div 
className='fixed bottom-[12px]
right-[25px]
text-white
animate-bounce
w-[50px]
h-[50px]
z-[6]
bg-white
rounded-full
'>

  {
    arrowState==='down' ?
  
<img 
alt='img'
src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWTsPJqNEwxav3Do6NwxHF8t6TaSbqTq32FU84m5VH7A&s'
className='
rounded-full
cursor-pointer
'
onClick={()=>handelGo('down')}
/>

:

<img 
alt='img'
src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Eo_circle_red_arrow-up.svg/512px-Eo_circle_red_arrow-up.svg.png?20200417173148'
className='
rounded-full
cursor-pointer
'
onClick={()=>handelGo('up')}

/>


}
</div>}

</div>
  )}

export default App;
