import React from "react";

export default function DishCard({ dish, quantity, onQuantityChange }) {
    return (
        <div className="dish-card">
            <img 
                src={dish.image} 
                alt={dish.name} 
                className="dish-card-image"
                onError={(e) => {
                    e.target.src = "./imgs/restaurantfood.jpg";
                }}
            />
            <div className="dish-card-header">
                <h3 className="dish-card-title">{dish.name}</h3>
                <span className="dish-card-price">${dish.price.toFixed(2)}</span>
            </div>
            <p className="dish-card-description">{dish.description}</p>
            <div className="dish-card-bottom">
                <div className="dish-card-category">
                    {dish.category}
                </div>
                <div className="dish-card-quantity-row">
                    <span className="dish-card-quantity-label">
                        Quantity:
                    </span>
                    <div className="dish-card-quantity-controls">
                        <button
                            type="button"
                            className="dish-card-quantity-btn minus"
                            onClick={() => onQuantityChange(dish.id, Math.max(0, quantity - 1))}
                            disabled={quantity === 0}
                        >
                            -
                        </button>
                        <span className="dish-card-quantity-value">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            className="dish-card-quantity-btn plus"
                            onClick={() => onQuantityChange(dish.id, quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
