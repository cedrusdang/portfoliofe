import React from "react";
import "./Banner.css";

export default function OrderBanner() {
    return(
        <div className='Banner-Background'>
            <div className='Banner'>
                <div className='Banner-content'>
                    <div className='Banner-title'>Order Online</div>
                    <div className='Banner-location'>Little Lemon</div>
                    <div className='Banner-description'>Choose your favorite dishes and enjoy Little Lemon delivered to your door!</div>
                </div>
                <img src={`${process.env.PUBLIC_URL}/imgs/lemon dessert.jpg`} className='Banner-image' alt="Little Lemon Food" loading="lazy"/>
            </div>
        </div>
    );
}
