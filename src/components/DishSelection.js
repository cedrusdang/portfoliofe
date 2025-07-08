import React from "react";
import DishCard from "./DishCard";
import "./DishSelection.css";

export default function DishSelection({ dishes, selectedDishes, onQuantityChange, error }) {
  return (
    <div className="dish-selection">
      <div className="dish-selection-header">
        <h2 className="dish-selection-title">Select Your Dishes</h2>
      </div>
      {error && (
        <div className="dish-selection-error">
          {error}
        </div>
      )}
      <div className="dish-selection-content">
        {dishes.map(dish => (
          <DishCard
            key={dish.id}
            dish={dish}
            quantity={selectedDishes[dish.id] || 0}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>
    </div>
  );
}
