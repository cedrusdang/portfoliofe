import './Nav.css';
import { Link } from 'react-router-dom';

export default function navigator(){
    return(
        <div className="App-header">
            <img src='/imgs/Logo.svg' className="App-logo" alt="logo" loading="lazy" />
            <nav className='App-menu'>
            <ul>
                <li><Link className="option" to="/">Home</Link></li>
                <li><Link className="option" to="/about">About</Link></li>
                <li><Link className="option" to="/menu">Menu</Link></li>
                <li><Link className="option" to="/reservations">Reservations</Link></li>
                <li><Link className="option" to="/orderonline">Order Online</Link></li>
                <li><Link className="option" to="/login">Login</Link></li>
            </ul>
            </nav>
        </div>
    )
}