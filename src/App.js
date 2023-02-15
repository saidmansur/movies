import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/main';
import Films from './components/films';
import Serials from './components/serials';
import Show from './components/show';
import Sgenre from './components/sgenre';
import Sshow from './components/sshow';
const App = ()=>{
    return (
      <div className="container-fluid">
        <Router>
          <Routes>
            <Route path='/sgenre/:id' element={<Sgenre/>}/>
            <Route path='/show/:id' element={<Show/>}/>
            <Route path='/serials/:page' element={<Serials/>}/>
            <Route path='/films/:page' element={<Films />} />
            <Route path="/" element={<Main />} />
            <Route path='/sshow/:id' element={<Sshow/>}/>
          </Routes>
        </Router>
      </div>
    );
}

export default App;
