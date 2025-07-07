import "./views.css"
import "../components/Banner.css";
import "../components/Special.css";

export default function About() {
  return (
    <>
      <div className="App-banner-block">
        <div className='Banner-Background'>
          <div className='Banner'>
            <div className='Banner-content'>
              <div className='Banner-title'>Our Story</div>
              <div className='Banner-location'>Little Lemon</div>
              <div className='Banner-description'>From humble beginnings to a beloved neighborhood gem in Chicago, discover the passion and tradition behind every dish we serve.</div>
            </div>
            <img src='/imgs/restaurant.jpg' className='Banner-image' alt="Mario and Adrian" loading="lazy"/>
          </div>
        </div>
      </div>
      <div className="App-content-block">
        <div className="special">
          <div className="header">
            <div className="title">Meet Our Family</div>
          </div>
          <div className="content">
            <div className="card">
              <img src="./imgs/Mario and Adrian A.jpg" alt="Founders Mario and Adrian" className="card-image" loading="lazy"/>
              <div className="card-header">
                <div className="card-title">The Founders</div>
              </div>
              <div className="card-description">Mario and Adrian, brought their grandmother's recipes from the Mediterranean to Chicago in 1995. Their shared dream was to create a place where traditional flavors meet modern dining.</div>
            </div>
            <div className="card">
              <img src="./imgs/restaurant chef B.jpg" alt="Kitchen team at work" className="card-image" loading="lazy"/>
              <div className="card-header">
                <div className="card-title">Our Kitchen</div>
              </div>
              <div className="card-description">Every dish is crafted with love in our open kitchen. Our chefs combine time-honored techniques with fresh, locally-sourced ingredients to create memorable dining experiences.</div>
            </div>
            <div className="card">
              <img src="./imgs/Mario and Adrian b.jpg" alt="Chef preparing meals" className="card-image" loading="lazy"/>
              <div className="card-header">
                <div className="card-title">Our Promise</div>
              </div>
              <div className="card-description">We believe food brings people together. From intimate dinners to family celebrations, Little Lemon has been creating cherished memories for Chicago families for over 25 years.</div>
            </div>            </div>
        </div>
      </div>
    </>
  );
}
