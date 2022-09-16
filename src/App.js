
import { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import ChannelVideos from './components/ChannelVideos';
import FirstPage from './components/FirstPage';
import Header from './components/Header';
import MoreInfoTop from './components/MoreInfoTop';
import SearchedVideos from './components/SearchedVideos';
import SideBar from './components/SideBar';
import WatchVideos from './components/WatchVideos';

function App() {
  // let sidebar=false;

  const [sidebarOpen, setsidebarOpen] = useState(false)
  // document.addEventListener('contextmenu', function(e) {
  //   e.preventDefault();
  // });

  
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

       

      </Routes>
}

    </div>
  );
}

export default App;
