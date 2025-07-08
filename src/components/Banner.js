import "./Banner.css"

export default function Banner() {
    return(
        <div className='Banner-Background'>
            <div className='Banner'>
                <div className='Banner-content'>
                    <div className='Banner-title'>Little Lemon</div>
                    <div className='Banner-location'>Chicago</div>
                    <div className='Banner-description'>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</div>
                    <button onClick={() => window.location.href='/reservations'} className='Reserve-button'>Reserve a Table</button>
                </div>
                <img src='/imgs/restaurantfood.jpg' className='Banner-image' alt="Little Lemon" loading="lazy"/>
            </div>
        </div>
    );
}