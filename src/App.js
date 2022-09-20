
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
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
// import { Avatar } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



function App() {


  const [sidebarOpen, setsidebarOpen] = useState(false)
  // document.addEventListener('contextmenu', function(e) {
  //   e.preventDefault();
  // });
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
        userName:(data.data?.email),
        userEmail:(data.data?.name)
      }
    })

  }

})

  
  // if(data?.data?.email===userss?.email){
  

 if(loading){
  return (
    <div className='
    flex
    '>
    <div className='
    flex
    flex-col
    m-auto
    mt-[55px]
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
    <div className="
    
   
    "
    id='demo'
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
      h-[100vh]

      
      '
      >
      <div
      className='w-[300px]
      m-auto
      '
      >
           <img 
           src='https://cdn160.picsart.com/upscale-270843074002211.png'
           alt='no interetnet img'
           />

           <h2>Connect to the internet</h2>
           <span>You're offline. Check your connection.</span>

           <button
           className='border-blue-500
           border
           
           
           '
           
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

<div
className='fixed bottom-[10px]
w-[50px]
right-[10px]
'
>
<div
className='bg-primaryBlack

'
>

  <ArrowUpwardIcon />
  <ArrowDownwardIcon/>





</div>
</div>
</div>
  )}

export default App;
