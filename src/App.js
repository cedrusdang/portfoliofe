import './App.css';
import Navigator from './components/Nav.js';
import Home from './views/Home.js';

function App() {
  return (
    <div className="App">
      <div className="App-navigator-block">
        <Navigator />
      </div>
      <div className="App-content-block">
        <Home />
      </div>
    </div>
  );
}

export default App;
