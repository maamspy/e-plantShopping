import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  // Algorithm: 
  // 1. Initialize total to 0
  // 2. Loop through each item in cart
  // 3. Extract numeric value from cost string (remove $ symbol)
  // 4. Multiply unit price by quantity for each item
  // 5. Add to running total
  // 6. Return formatted total with 2 decimal places
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costValue = parseFloat(item.cost.substring(1)); // Remove $ and convert to number
      return total + (costValue * item.quantity);
    }, 0).toFixed(2);
  };

  // Continue shopping - return to plant listing page
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e); // Call parent function to navigate back
  };

  // Checkout functionality placeholder
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Increment quantity of an item
  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
  };

  // Decrement quantity of an item
  // If quantity > 1: decrease by 1
  // If quantity = 1: remove item from cart
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    } else {
      // If quantity would drop to 0, remove the item entirely
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for individual item (subtotal)
  // Extract numeric value from cost string and multiply by quantity
  const calculateTotalCost = (item) => {
    const costValue = parseFloat(item.cost.substring(1)); // Remove $ symbol
    return (costValue * item.quantity).toFixed(2);
  };

  // Calculate total number of items in cart (for cart icon badge)
  const getTotalItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.length === 0 ? (
          <p style={{ 
            color: 'black', 
            textAlign: 'center', 
            fontSize: '18px', 
            marginTop: '50px' 
          }}>
            Your cart is empty. Continue shopping to add plants!
          </p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img 
                className="cart-item-image" 
                src={item.image} 
                alt={item.name} 
              />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit Price: {item.cost}</div>
                <div className="cart-item-quantity">
                  <button 
                    className="cart-item-button cart-item-button-dec" 
                    onClick={() => handleDecrement(item)}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <button 
                    className="cart-item-button cart-item-button-inc" 
                    onClick={() => handleIncrement(item)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Subtotal: ${calculateTotalCost(item)}
                </div>
                <button 
                  className="cart-item-delete" 
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Display total items count */}
      {cart.length > 0 && (
        <div style={{ marginTop: '20px', color: 'black', fontSize: '16px' }}>
          Total Items in Cart: {getTotalItemCount()}
        </div>
      )}
      
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      
      <div className="continue_shopping_btn">
        <button 
          className="get-started-button" 
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button 
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;