import './App.css';
import { React, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Registration from './components/registration/registration';
import Background from './components/background/background';
import Header from './components/header/Header';
import News from './components/news/News';
import Info from './components/info/Info';
import MainPage from './components/main/MainPage';
import NotFound from './components/NotFound/NotFound';
import SignInPage from './components/registration/signin';
import { Auth } from './api/api';
import { useLocation } from 'react-router-dom'
import { IsLogged } from './api/checker';

function App() {
  const [user, setUser] = useState(null)
  const locationId = useLocation().pathname;
  IsLogged(locationId)

  useEffect(() => {
    Auth().then(res => res.json())
    .then(data => {if (data.user) setUser(data)} )
  }, [])


  return (
    <div className="app-wrapper" id="application">
      <div className="app-wrapper-content">
        <Routes>
          <Route path="*" element={<div>
            <Header setUser={setUser}/>
            <Routes>
              <Route path="/" element={<MainPage user={user} />} />
              <Route path="/info" element={<Info user={user}/>} />
              <Route path="/news" element={<News user={user}/>} />
              <Route path="*" element={<NotFound user={user}/>} />
            </Routes>
          </div>
          } />
          <Route path="/registration" element={<div>
            <Background />
            <Registration setUser={setUser} user={user} />
          </div>
          } />
          <Route path="/login" element={<div>
            <Background />
            <SignInPage setUser={setUser} user={user} />
          </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;


// https://youtu.be/dQw4w9WgXcQ