import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src='Logo.svg' className="App-logo" alt="logo" />
        <nav className='App-menu'>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Menu</li>
            <li>Reservations</li>
            <li>Order Online</li>
            <li>Login</li>
          </ul>
        </nav>
      </div>
      
      <div className='Banner-Background'>
        <div className='Banner'>
          <div className='Banner-content'>
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
            <button className='Reserve-button'>Reserve a Table</button>
          </div>
          <img src='restaurantfood.jpg' className='Banner-image' alt="Little Lemon"/>
        </div>
      </div>

    </div>
  );
}

export default App;
