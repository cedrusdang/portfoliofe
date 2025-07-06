import Banner from "../components/Banner";
import Special from "../components/Special";

export default function Home() {
    return (
        <>
            <div className="App-banner-block">
                <Banner />
            </div>
            <div className="App-content-block">
                <Special />
            </div>
        </>
    );
}
