import './Nav.css';

export default function navigator(){
    return(
        <div className="App-header">
            <img src='/imgs/Logo.svg' className="App-logo" alt="logo" />
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
    )
}