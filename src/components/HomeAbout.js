import "./HomeAbout.css";

export default function HomeAbout() {
    return (
        <section className="home-about">
            <div className="about-content">
                <div className="about-content-title">Little Lemon</div>
                <div className="about-content-title2">Chicago</div>
                <div className="about-content-desc">
                    Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes with a modern twist. Our chefs Adrian and Mario bring passion and creativity to every dish, ensuring a memorable dining experience.
                </div>
            </div>
            <div className="about-images-stacked">
                <img src="/imgs/Mario and Adrian A.jpg" alt="Restaurant Chef" className="about-img1-stacked" />
                <img src="/imgs/Mario and Adrian b.jpg" alt="Adrian and Mario" className="about-img2-stacked" />
            </div>
        </section>
    );
}
