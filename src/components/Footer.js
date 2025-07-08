import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-background">
        <div className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                <img src='../../imgs/Logo.svg' alt="Little Lemon Logo" />
                </div>
                <div className="footer-doormat">
                <h4>Doormat Navigation</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/menu">Menu</a></li>
                    <li><a href="/reservations">Reservations</a></li>
                    <li><a href="/orderonline">Order Online</a></li>
                    <li><a href="/login">Login</a></li>
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