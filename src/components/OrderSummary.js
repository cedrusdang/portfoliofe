import React from "react";
import "./OrderSummary.css";

export default function OrderSummary({ selectedDishes, dishes, total, isSubmitting }) {
  const hasSelectedDishes = Object.keys(selectedDishes).length > 0;

  const getButtonClass = () => {
    let classes = "submit-button";
    if (isSubmitting) classes += " processing";
    if (!hasSelectedDishes) classes += " no-items";
    return classes;
  };

  return (
    <div className="available-table-container">
      <h2 className="table-title">Order Summary</h2>
      {hasSelectedDishes ? (
        <table className="available-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedDishes).map(([dishId, quantity], index) => {
              const dish = dishes.find(d => d.id === parseInt(dishId));
              return (
                <tr key={dishId} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{dish.name}</td>
                  <td>{quantity}</td>
                  <td>${(dish.price * quantity).toFixed(2)}</td>
                </tr>
              );
            })}
            <tr className="total-row">
              <td colSpan="2">Total</td>
              <td>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="no-items-message">
          No items selected yet. Choose your favorite dishes above!
        </div>
      )}
      
      <div className="submit-section">
        <button
          type="submit"
          disabled={isSubmitting || !hasSelectedDishes}
          className={getButtonClass()}
        >
          {isSubmitting && (
            <div className="loading-spinner"></div>
          )}
          {isSubmitting ? "Processing Order..." : `Place Order - $${total.toFixed(2)}`}
        </button>
        
        <p className="demo-notice">
          * This is a demo. No actual payment will be processed.
        </p>
      </div>
    </div>
  );
}
