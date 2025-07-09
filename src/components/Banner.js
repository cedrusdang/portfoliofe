import "./Banner.css"
import { useNavigate } from "react-router-dom";

export default function Banner() {
    const navigate = useNavigate();
    return(
        <div className='Banner-Background'>
            <div className='Banner'>
                <div className='Banner-content'>
                    <div className='Banner-title'>Little Lemon</div>
                    <div className='Banner-location'>Chicago</div>
                    <div className='Banner-description'>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</div>
                    <button onClick={() => navigate('/reservations')} className='Reserve-button'>Reserve a Table</button>
                </div>
                <img src={`${process.env.PUBLIC_URL}/imgs/restaurantfood.jpg`} className='Banner-image' alt="Little Lemon" loading="lazy"/>
            </div>
        </div>
    );
}