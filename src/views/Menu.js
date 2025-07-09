import "./views.css";
import { useNavigate } from "react-router-dom";

const dishes = [
  {
    title: "Grilled Vegetables & Cannellini Beans",
    price: "$10.99",
    img: `${process.env.PUBLIC_URL}/imgs/Grilled-vegetables-with-cannellini-beans-vegan-pesto.jpg`,
    desc: "Charred zucchini, bell peppers, and eggplant tossed with creamy cannellini beans and a fresh basil pesto.",
  },
  {
    title: "Mediterranean Grilled Chicken Salad",
    price: "$13.99",
    img: `${process.env.PUBLIC_URL}/imgs/Mediterranean grilled chicken salad.jpeg`,
    desc: "Grilled chicken breast, mixed greens, cherry tomatoes, cucumbers, Kalamata olives, and feta with lemon vinaigrette.",
  },
  {
    title: "Mediterranean Chicken Skewers",
    price: "$14.50",
    img: `${process.env.PUBLIC_URL}/imgs/mediterranean-chicken-square.avif`,
    desc: "Juicy chicken skewers marinated in Mediterranean spices, served with roasted vegetables and tzatziki sauce.",
  },
  {
    title: "Roasted Cod with Cherry Tomatoes",
    price: "$16.99",
    img: `${process.env.PUBLIC_URL}/imgs/roasted cod or halibut with cherry tomatoes and green beans.jpeg`,
    desc: "Oven-roasted cod fillet with blistered cherry tomatoes, green beans, and a lemon-herb drizzle.",
  },
  {
    title: "Red Lentil & Veggie Stew",
    price: "$11.99",
    img: `${process.env.PUBLIC_URL}/imgs/savory red lentil and vegetable stew served over mashed potatoes.jpg`,
    desc: "Hearty stew of red lentils, carrots, and root vegetables, served over creamy mashed potatoes.",
  },
  {
    title: "Sheet Pan Salmon & Veggies",
    price: "$17.99",
    img: `${process.env.PUBLIC_URL}/imgs/sheet-pan-roasted-salmon-vegetables.jpg`,
    desc: "Baked salmon fillet with a medley of roasted seasonal vegetables and a dill yogurt sauce.",
  },
  {
    title: "Greek Salad",
    price: "$12.99",
    img: `${process.env.PUBLIC_URL}/imgs/greek salad.jpg`,
    desc: "Crisp romaine, tomatoes, cucumbers, red onion, Kalamata olives, and feta cheese with oregano vinaigrette.",
  },
  {
    title: "Bruschetta",
    price: "$5.99",
    img: `${process.env.PUBLIC_URL}/imgs/bruchetta.svg`,
    desc: "Toasted rustic bread topped with marinated tomatoes, garlic, basil, and a drizzle of olive oil.",
  },
  {
    title: "Lemon Dessert",
    price: "$5.00",
    img: `${process.env.PUBLIC_URL}/imgs/lemon dessert.jpg`,
    desc: "Tangy lemon custard layered with shortbread and topped with whipped cream and lemon zest.",
  },
];
export default function Menu() {
  const navigate = useNavigate();
  return (
    <div className="Content-menu">
      <h1>Menu</h1>
      <p>Explore our delicious menu options!</p>
      <div className="menu-grid">
        {dishes.map((dish, idx) => (
          <div className="card" key={idx}>
            <img
              src={dish.img}
              alt={dish.title}
              className="card-image"
              loading="lazy"
            />
            <div className="card-header">
              <div className="card-title">{dish.title}</div>
              <div className="card-price">{dish.price}</div>
            </div>
            <div className="card-description">{dish.desc}</div>
            <button
              className="order-button"
              onClick={() => navigate('/orderonline')}
            >
              Order a delivery{" "}
              <img src={`${process.env.PUBLIC_URL}/imgs/motobike.png`} alt="Delivery" loading="lazy" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
