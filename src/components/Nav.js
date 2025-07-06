import './Nav.css';

export default function navigator(){
    return(
        <div className="App-header">
            <img src='/imgs/Logo.svg' className="App-logo" alt="logo" />
            <nav className='App-menu'>
            <ul>
                <li src="/views/home">Home</li>
                <li src="/views/about">About</li>
                <li src="/views/menu">Menu</li>
                <li src="/views/reservations">Reservations</li>
                <li src="/views/order-online">Order Online</li>
                <li src="/views/login">Login</li>
            </ul>
            </nav>
        </div>
    )
}