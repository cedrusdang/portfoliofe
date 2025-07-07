import "./HomeAbout.css";

export default function HomeAbout() {
    return (
        <>
            <div className="about-title">About Us</div>
            <section className="home-about">
                <div className="about-inline">
                    <div className="about-content">
                        <div className="about-content-title">Little Lemon</div>
                        <div className="about-content-title2">Chicago</div>
                        <div className="about-content-desc">
                            Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes with a modern twist. Our chefs Adrian and Mario bring passion and creativity to every dish, ensuring a memorable dining experience.
                        </div>
                    </div>
                    <img
                        src="/imgs/stacked.png"
                        alt="Restaurant"
                        className="about-img1-inline"
                        loading="lazy"
                    />
                </div>
            </section>
        </>
    );
}
