const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cartItem",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
    cartTotalAmount: 0,
    cartTotalQuantity: 0,
    cartTotalDiscount:0,
  },
  
  reducers: {

    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;
      }
    },

    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, item) => {
          const { price, cartQuantity } = item;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },


    getDiscountTotals(state) {
        let { total, quantity } = state.cartItems.reduce(
          (cartTotal, item) => {
            const { actualPrice, cartQuantity } = item;
            const itemTotal = actualPrice * cartQuantity;
  
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
  
            return cartTotal;
          },
          {
            total: 0,
            quantity: 0,
          }
        );
  
        state.cartTotalQuantity = quantity;
        state.cartTotalDiscount = total;
      },



    remove(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;
        }

        return state;
      });
    },

    clearCart(state) {
        state.cartItems =[];
    }
  },
});
export const addedItem = (state) => state.cartItem
export const { addToCart, remove, decreaseCart, getTotals ,clearCart,getDiscountTotals} = cartSlice.actions;
export default cartSlice.reducer;
