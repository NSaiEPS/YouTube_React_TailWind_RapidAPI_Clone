
import { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';

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

    <BrowserRouter>
      <Routes>
        <Route/>

       

      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
