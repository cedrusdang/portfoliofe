import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-background">
        <div className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                <img src={`${process.env.PUBLIC_URL}/imgs/Logo.svg`} alt="Little Lemon Logo" />
                </div>
                <div className="footer-doormat">
                <h4>Doormat Navigation</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/reservations">Reservations</Link></li>
                    <li><Link to="/orderonline">Order Online</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
                </div>
                <div className="footer-contact">
                <h4>Contact</h4>
                <p>123 Main St, Anytown, USA</p>
                <p>(123) 456-7890</p>
                <p>info@littlelemon.com</p>
                </div>
                <div className="footer-social">
                <h4>Social Media Links</h4>
                <p>Facebook: <a href="https://www.facebook.com/littlelemon" target="_blank" rel="noopener noreferrer">littlelemon</a></p>
                <p>Instagram: <a href="https://www.instagram.com/littlelemon" target="_blank" rel="noopener noreferrer">@littlelemon</a></p>
                <p>Twitter: <a href="https://www.twitter.com/littlelemon" target="_blank" rel="noopener noreferrer">@littlelemon</a></p>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;