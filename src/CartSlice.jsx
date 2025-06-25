import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // addItem() reducer - Adds a new plant item to the items array
    // Gets called when user selects "Add to cart" on plant listing page
    addItem: (state, action) => {
      const { name, image, cost, description } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // If item already exists, increment quantity
        existingItem.quantity++;
      } else {
        // If item doesn't exist, add new item with quantity 1
        state.items.push({ 
          name, 
          image, 
          cost, 
          description, 
          quantity: 1 
        });
      }
    },

    // removeItem() reducer - Removes an item from cart based on its name
    // Gets called when user wants to remove products from the cart
    removeItem: (state, action) => {
      // Filter out the item with the matching name
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // updateQuantity() reducer - Updates the quantity of an existing item
    // Extracts item's name and new quantity from action.payload
    // Finds the item in state.items array and updates its quantity
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        if (quantity <= 0) {
          // If quantity is 0 or negative, remove the item
          state.items = state.items.filter(item => item.name !== name);
        } else {
          // Update the quantity to the new amount
          itemToUpdate.quantity = quantity;
        }
      }
    },
  },
});

// Export action creators for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer as default for use in store.js
export default CartSlice.reducer;