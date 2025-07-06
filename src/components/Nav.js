import './Nav.css';

export default function navigator(){
    return(
        <div className="App-header">
            <img src='/imgs/Logo.svg' className="App-logo" alt="logo" />
            <nav className='App-menu'>
            <ul>
                <li><a className="option" href="/">Home</a></li>
                <li><a className="option" href="/about">About</a></li>
                <li><a className="option" href="/menu">Menu</a></li>
                <li><a className="option" href="/BookingPage">Reservations</a></li>
                <li><a className="option" href="/orderonline">Order Online</a></li>
                <li><a className="option" href="/login">Login</a></li>
            </ul>
            </nav>
        </div>
    )
}