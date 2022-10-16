const { createSlice } = require("@reduxjs/toolkit");

const productSlice = createSlice({
  name: "productDetail",
  initialState: localStorage.getItem("initialState")
  ? JSON.parse(localStorage.getItem("initialState"))
  : [],
  reducers: {
    item(state, action) {
      console.log(state, action?.payload, "<=====action");
      state.pop();
      state.push(action?.payload);
      localStorage.setItem("initialState", JSON.stringify(state));
      
     },
  },
});


export const { item } = productSlice.actions;
export const details= (state) => state.productDetail;
export default productSlice.reducer;
