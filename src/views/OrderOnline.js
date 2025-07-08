import React, { useState } from "react";
import "./views.css";
import OrderBanner from "../components/OrderBanner";
import DishSelection from "../components/DishSelection";
import CustomerForm from "../components/CustomerForm";
import PaymentForm from "../components/PaymentForm";
import OrderSummary from "../components/OrderSummary";

export default function OrderOnline() {
  // Available dishes data
  const dishes = [
    {
      id: 1,
      name: "Greek Salad",
      price: 12.99,
      description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
      image: "./imgs/greek salad.jpg",
      category: "Salads"
    },
    {
      id: 2,
      name: "Bruschetta",
      price: 5.99,
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
      image: "./imgs/bruchetta.svg",
      category: "Appetizers"
    },
    {
      id: 3,
      name: "Lemon Dessert",
      price: 5.00,
      description: "This comes straight from grandma's recipe book, every bite will remind you of the best moments in your life.",
      image: "./imgs/lemon dessert.jpg",
      category: "Desserts"
    },
    {
      id: 4,
      name: "Mediterranean Grilled Chicken",
      price: 18.99,
      description: "Tender grilled chicken with Mediterranean herbs and spices, served with fresh vegetables.",
      image: "./imgs/Mediterranean grilled chicken salad.jpeg",
      category: "Main Course"
    },
    {
      id: 5,
      name: "Grilled Vegetables with Beans",
      price: 14.99,
      description: "Fresh grilled vegetables with cannellini beans and vegan pesto sauce.",
      image: "./imgs/Grilled-vegetables-with-cannellini-beans-vegan-pesto.jpg",
      category: "Vegetarian"
    },
    {
      id: 6,
      name: "Roasted Salmon",
      price: 22.99,
      description: "Fresh salmon roasted with cherry tomatoes and green beans.",
      image: "./imgs/sheet-pan-roasted-salmon-vegetables.jpg",
      category: "Seafood"
    },
    {
      id: 7,
      name: "Roasted Cod",
      price: 19.99,
      description: "Tender roasted cod with cherry tomatoes and green beans, perfectly seasoned.",
      image: "./imgs/roasted cod or halibut with cherry tomatoes and green beans.jpeg",
      category: "Seafood"
    },
    {
      id: 8,
      name: "Lentil Stew",
      price: 13.99,
      description: "Savory red lentil and vegetable stew served over mashed potatoes.",
      image: "./imgs/savory red lentil and vegetable stew served over mashed potatoes.jpg",
      category: "Vegetarian"
    },
    {
      id: 9,
      name: "Mediterranean Chicken Square",
      price: 16.99,
      description: "Mediterranean-style chicken with herbs and spices, perfectly grilled.",
      image: "./imgs/mediterranean-chicken-square.avif",
      category: "Main Course"
    }
  ];

  // Form state
  const [selectedDishes, setSelectedDishes] = useState({});
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    phone: "",
    name: ""
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle dish quantity change
  const handleDishQuantityChange = (dishId, quantity) => {
    setSelectedDishes(prev => {
      if (quantity === 0) {
        const newSelected = { ...prev };
        delete newSelected[dishId];
        return newSelected;
      }
      return {
        ...prev,
        [dishId]: quantity
      };
    });
  };

  // Handle customer info change
  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Handle payment info change
  const handlePaymentInfoChange = (field, value) => {
    // Format card number with spaces
    if (field === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (value.length > 19) return; // Max 16 digits + 3 spaces
    }
    // Format expiry date
    if (field === "expiryDate") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      if (value.length > 5) return;
    }
    // Format CVV
    if (field === "cvv") {
      value = value.replace(/\D/g, "");
      if (value.length > 3) return;
    }

    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ""));
  };

  const validateCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, "");
    return cleaned.length === 16 && /^\d+$/.test(cleaned);
  };

  const validateExpiryDate = (expiryDate) => {
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
    const [month, year] = expiryDate.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (parseInt(month) < 1 || parseInt(month) > 12) return false;
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) return false;
    
    return true;
  };

  // Calculate total
  const calculateTotal = () => {
    return Object.entries(selectedDishes).reduce((total, [dishId, quantity]) => {
      const dish = dishes.find(d => d.id === parseInt(dishId));
      return total + (dish.price * quantity);
    }, 0);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    const newErrors = {};
    
    // Check if any dishes are selected
    if (Object.keys(selectedDishes).length === 0) {
      newErrors.dishes = "Please select at least one dish";
    }
    
    // Validate customer info
    if (!customerInfo.name.trim()) newErrors.name = "Name is required";
    if (!customerInfo.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(customerInfo.email)) newErrors.email = "Please enter a valid email";
    if (!customerInfo.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!validatePhone(customerInfo.phone)) newErrors.phone = "Please enter a valid phone number";
    
    // Validate payment info
    if (!paymentInfo.cardholderName.trim()) newErrors.cardholderName = "Cardholder name is required";
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    else if (!validateCardNumber(paymentInfo.cardNumber)) newErrors.cardNumber = "Please enter a valid 16-digit card number";
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
    else if (!validateExpiryDate(paymentInfo.expiryDate)) newErrors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    if (!paymentInfo.cvv.trim()) newErrors.cvv = "CVV is required";
    else if (paymentInfo.cvv.length !== 3) newErrors.cvv = "CVV must be 3 digits";
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Simulate order processing
      setTimeout(() => {
        const orderDetails = {
          dishes: Object.entries(selectedDishes).map(([dishId, quantity]) => {
            const dish = dishes.find(d => d.id === parseInt(dishId));
            return {
              name: dish.name,
              quantity,
              price: dish.price,
              total: dish.price * quantity
            };
          }),
          customer: customerInfo,
          payment: {
            cardNumber: paymentInfo.cardNumber.replace(/\d(?=\d{4})/g, "*"),
            total: calculateTotal()
          },
          orderTime: new Date().toISOString()
        };
        
        console.log("Order submitted successfully:", orderDetails);
        
        // Show success message
        alert(`🎉 Order Submitted Successfully!\n\n📄 Order Summary:\n${Object.entries(selectedDishes).map(([dishId, quantity]) => {
          const dish = dishes.find(d => d.id === parseInt(dishId));
          return `• ${dish.name} x${quantity} - $${(dish.price * quantity).toFixed(2)}`;
        }).join('\n')}\n\n💰 Total: $${calculateTotal().toFixed(2)}\n\n📧 A confirmation email will be sent to ${customerInfo.email} shortly with billing details and delivery information.\n\n🚚 Estimated delivery time: 30-45 minutes\n\n🍋 Thank you for choosing Little Lemon!`);
        
        // Reset form
        setSelectedDishes({});
        setCustomerInfo({ email: "", phone: "", name: "" });
        setPaymentInfo({ cardNumber: "", expiryDate: "", cvv: "", cardholderName: "" });
        setIsSubmitting(false);
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <OrderBanner />
      <div className="Content">
        <form onSubmit={handleSubmit}>
          {/* Dish Selection Section */}
          <DishSelection
            dishes={dishes}
            selectedDishes={selectedDishes}
            onQuantityChange={handleDishQuantityChange}
            error={errors.dishes}
          />

          {/* Customer Information Section */}
          <CustomerForm
            customerInfo={customerInfo}
            onInfoChange={handleCustomerInfoChange}
            errors={errors}
          />

          {/* Payment Information Section */}
          <PaymentForm
            paymentInfo={paymentInfo}
            onPaymentChange={handlePaymentInfoChange}
            errors={errors}
          />

          {/* Order Summary */}
          <OrderSummary
            selectedDishes={selectedDishes}
            dishes={dishes}
            total={calculateTotal()}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
