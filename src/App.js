import './App.css';
import Navigator from './components/Nav.js';
import Home from './views/Home.js';
import About from './views/About.js';
import Menu from './views/Menu.js';
import Reservations from './views/Reservations.js';
import OrderOnline from './views/OrderOnline.js';
import Login from './views/Login.js';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Footer from './components/Footer.js';

// This component handles the main content of the app, including navigation and routes
function AppContent() {
  return (
    <div className="App">
      <div className="App-navigator-block">
        <Navigator />
      </div>
      <div className="App-main-block" style={{ position: 'relative' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/orderonline" element={<OrderOnline />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/littlelemon">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
