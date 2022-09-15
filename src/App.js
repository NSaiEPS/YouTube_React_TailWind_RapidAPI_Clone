
import { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import FirstPage from './components/FirstPage';
import Header from './components/Header';
import MoreInfoTop from './components/MoreInfoTop';
import SearchedVideos from './components/SearchedVideos';
import SideBar from './components/SideBar';
import WatchVideos from './components/WatchVideos';

function App() {
  // let sidebar=false;

  const [sidebarOpen, setsidebarOpen] = useState(false)

  return (
    <div className="
   
    ">



      <Header  
    sidebarOpen={sidebarOpen}
    setsidebarOpen={setsidebarOpen}
    
    />
    {sidebarOpen &&
    
    <SideBar
    setsidebarOpen={setsidebarOpen}
    
    />

}
<Routes>


        <Route path='/' element={<FirstPage/>}/>
        <Route path='/search/:name' element={<SearchedVideos/>}/>
        <Route path='/watch/:id' element={<WatchVideos/>}/>
        {/* <Route path='/channel/:id' element={<SearchedVideos/>}/> */}

       

      </Routes>

    </div>
  );
}

export default App;
