import './App.css';
import Navigator from './components/Nav.js';
import Home from './views/Home.js';
import About from './views/About.js';
import Menu from './views/Menu.js';
import Reservations from './views/Reservations.js';
import OrderOnline from './views/OrderOnline.js';
import Login from './views/Login.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-navigator-block">
          <Navigator />
        </div>
        <div className="App-content-block">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/orderonline" element={<OrderOnline />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
