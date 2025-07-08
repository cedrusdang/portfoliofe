import "./Special.css"

export default function Special() {
    return(
        <div className="special">
            <div className="header">
                <div className="title">This week specials!</div>
                <button className="menu" onClick={() => window.location.href='/menu'}>Online Menu</button>
            </div>
            <div className="content">
                <div className="card">
                    <img src="./imgs/greek salad.jpg" alt="Greek Salad" className="card-image" loading="lazy"/>
                    <div className="card-header">
                        <div className="card-title">Greek Salad</div>
                        <div className="card-price">$12.99</div>
                    </div>
                    <div className="card-description">The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</div>
                    <button className="order-button" onClick={() => window.location.href='/orderonline'}>Order a delivery <img src="./imgs/motobike.png" alt="Arrow"/></button>
                </div>
                <div className="card">
                    <img src="./imgs/bruchetta.svg" alt="Bruschetta" className="card-image" loading="lazy"/>
                    <div className="card-header">
                        <div className="card-title">Bruschetta</div>
                        <div className="card-price">$5.99</div>
                    </div>
                    <div className="card-description">Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</div>
                    <button className="order-button" onClick={() => window.location.href='/orderonline'}>Order a delivery <img src="./imgs/motobike.png" alt="Arrow"/></button>
                </div>
                <div className="card">
                    <img src="./imgs/lemon dessert.jpg" alt="Lemon Dessert" className="card-image" loading="lazy"/>
                    <div className="card-header">
                        <div className="card-title">Lemon Dessert</div>
                        <div className="card-price">$5.00</div>
                    </div>
                    <div className="card-description">This comes straight from grandma’s recipe book, every bite will remind you of the best moments in your life.</div>
                    <button className="order-button" onClick={() => window.location.href='/orderonline'}>Order a delivery <img src="./imgs/motobike.png" alt="Arrow"/></button>
                </div>
            </div>
        </div>
    );
}