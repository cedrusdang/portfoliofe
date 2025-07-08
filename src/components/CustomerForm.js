import React from "react";
import "./FormStyles.css";

export default function CustomerForm({ customerInfo, onInfoChange, errors }) {
  return (
    <div className="customer-form-container">
      <div className="payment-form-wrapper">
        <div className="customer-form">
          <h2>Customer Information</h2>
          
          <div className="form-grid-two">
            <div className="form-field">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                value={customerInfo.name}
                onChange={(e) => onInfoChange("name", e.target.value)}
                className={errors.name ? "error" : ""}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <div className="error-message">
                  {errors.name}
                </div>
              )}
            </div>
            
            <div className="form-field">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                value={customerInfo.phone}
                onChange={(e) => onInfoChange("phone", e.target.value)}
                className={errors.phone ? "error" : ""}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <div className="error-message">
                  {errors.phone}
                </div>
              )}
            </div>
          </div>
          
          <div className="form-field">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              value={customerInfo.email}
              onChange={(e) => onInfoChange("email", e.target.value)}
              className={errors.email ? "error" : ""}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <div className="error-message">
                {errors.email}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
