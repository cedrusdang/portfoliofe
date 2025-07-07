import './Testimonials.css';

export default function Testimonials() {
    return (
        <section className="testimonials-container">
            <div className="testimonials-title">Testimonials</div>
            <div className="testimonials-list">
                <div className="testimonial-card">
                    <img src="/imgs/customerA.png" alt="Customer 1" className="testimonial-avatar" />
                    <div className="testimonial-name">Sarah L.</div>
                    <div className="testimonial-role">Diner</div>
                    <div className="testimonial-text">
                        "The food was amazing! The flavors were authentic and the service was excellent."
                    </div>
                </div>
                <div className="testimonial-card">
                    <img src="/imgs/customerB.png" alt="Customer 2" className="testimonial-avatar" />
                    <div className="testimonial-name">John D.</div>
                    <div className="testimonial-role">Diner</div>
                    <div className="testimonial-text">
                        "A wonderful dining experience! The atmosphere was cozy and the dishes were beautifully presented."
                    </div>
                </div>
                <div className="testimonial-card">
                    <img src="/imgs/customerC.png" alt="Customer 3" className="testimonial-avatar" />
                    <div className="testimonial-name">Emily R.</div>
                    <div className="testimonial-role">Diner</div>
                    <div className="testimonial-text">
                        "Absolutely loved it! Friendly staff and delicious food. Will definitely come back."
                    </div>
                </div>
                <div className="testimonial-card">
                    <img src="/imgs/customerD.png" alt="Customer 4" className="testimonial-avatar" />
                    <div className="testimonial-name">Michael S.</div>
                    <div className="testimonial-role">Diner</div>
                    <div className="testimonial-text">
                        "Great place for family dinners. The menu has something for everyone and the staff is very accommodating."
                    </div>
                </div>
            </div>
        </section>
    );
}
