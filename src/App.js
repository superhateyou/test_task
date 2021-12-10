import './App.css';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom'
import Registration from './components/registration/registration';
import Background from './components/background/background';
import Header from './components/header/Header';
import News from './components/news/News';
import Info from './components/info/Info';
import MainPage from './components/main/MainPage';

function App() {
  return (
    <div className="app-wrapper" id="application">
        <Header />
        {/* <Nav /> */}
       {/* <Background /> */}
      <div className="app-wrapper-content">
          {/* <Registration /> */}
          <Routes>
            <Route path="*" element={<MainPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/info" element={<Info />} />
            <Route path="/news" element={<News />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
