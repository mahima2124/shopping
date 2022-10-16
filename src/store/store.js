import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import cartReducer from './cartSlice'

const store = configureStore({
    reducer : {
        productDetail : productReducer,
        cartItem : cartReducer,
        
    }
})

export default store;