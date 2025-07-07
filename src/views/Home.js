import Banner from "../components/Banner";
import Special from "../components/Special";
import HomeAbout from "../components/HomeAbout";
import Testimonials from "../components/Testimonials";


export default function Home() {
    return (
        <>
            <div className="App-banner-block" style={{ gridRow: 'span 1' }}>
                <Banner />
            </div>
            <div className="App-content-block" style={{ gridRow: 'span 2' }}>
                <Special />
            </div>
            <div className="App-content-block" style={{ gridRow: 'span 3' }}>
                <Testimonials />
            </div>
            <div className="App-content-block" style={{ gridRow: 'span 4' }}>
                <HomeAbout />
            </div>
        </>
    );
}
