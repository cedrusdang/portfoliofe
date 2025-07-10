import './Nav.css';
import { Link } from 'react-router-dom';

export default function Navigator(){
    return(
        <div className="App-header">
            <Link to="/">
                <img className="App-logo"
                    alt="logo"
                    loading="lazy"
                    src={`${process.env.PUBLIC_URL}/imgs/Logo.svg`} />
            </Link>
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