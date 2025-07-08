import React from "react";
import "./FormStyles.css";

export default function PaymentForm({ paymentInfo, onPaymentChange, errors }) {
  return (
    <div className="payment-form-container">
      <div className="payment-form-wrapper">
        <div className="payment-form">
          <h2>Payment Information</h2>
          
          <div className="form-field">
            <label htmlFor="cardholderName">Cardholder Name *</label>
            <input
              type="text"
              id="cardholderName"
              value={paymentInfo.cardholderName}
              onChange={(e) => onPaymentChange("cardholderName", e.target.value)}
              className={errors.cardholderName ? "error" : ""}
              placeholder="Name as it appears on card"
            />
            {errors.cardholderName && (
              <div className="error-message">
                {errors.cardholderName}
              </div>
            )}
          </div>
          
          <div className="form-field">
            <label htmlFor="cardNumber">Card Number *</label>
            <input
              type="text"
              id="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={(e) => onPaymentChange("cardNumber", e.target.value)}
              className={errors.cardNumber ? "error" : ""}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <div className="error-message">
                {errors.cardNumber}
              </div>
            )}
          </div>
          
          <div className="form-grid-two">
            <div className="form-field">
              <label htmlFor="expiryDate">Expiry Date *</label>
              <input
                type="text"
                id="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={(e) => onPaymentChange("expiryDate", e.target.value)}
                className={errors.expiryDate ? "error" : ""}
                placeholder="MM/YY"
              />
              {errors.expiryDate && (
                <div className="error-message">
                  {errors.expiryDate}
                </div>
              )}
            </div>
            
            <div className="form-field">
              <label htmlFor="cvv">CVV *</label>
              <input
                type="text"
                id="cvv"
                value={paymentInfo.cvv}
                onChange={(e) => onPaymentChange("cvv", e.target.value)}
                className={errors.cvv ? "error" : ""}
                placeholder="123"
              />
              {errors.cvv && (
                <div className="error-message">
                  {errors.cvv}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
