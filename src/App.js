import './App.css';
import Navigator from './components/Nav.js';
import Home from './views/Home.js';
import About from './views/About.js';
import Menu from './views/Menu.js';
import BookingPage from './views/BookingPage.js';
import OrderOnline from './views/OrderOnline.js';
import Login from './views/Login.js';
import Loading from './components/Loading.js';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700); // 700ms loading
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="App">
      <div className="App-navigator-block">
        <Navigator />
      </div>
      <div className="App-content-block" style={{ position: 'relative' }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 1000 }}>
            <Loading />
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path="/orderonline" element={<OrderOnline />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
