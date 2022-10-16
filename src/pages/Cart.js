import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {addToCart,remove,decreaseCart,getTotals,clearCart,getDiscountTotals,addedItem,} from "../store/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const addProducts = useSelector(addedItem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
    dispatch(getDiscountTotals());
  }, [addProducts, dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };

  const handleDecreaseCart = (productId) => {
    dispatch(decreaseCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <div className="cartWrapper">
        <h2 className="yourCart">YOUR CART</h2>
        <hr />
        {console.log(addProducts, "======>>>>addProducts")}
        {console.log(addProducts.cartItems.length,"======>>>>addProducts length")}

        {addProducts.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
          </div>
        ) : (
          <div className="leftPart">
            {addProducts.cartItems.map((product) => {
              return (
                <div className="cart">
                  <div key={product.id} className="cartCard">
                    <img className="addedCartImg" src={product.img} alt="" />
                    <h5>{product.name} </h5>

                    <div className="cart-product-price">₹{product.price}</div>
                    <div className="cart-product-quantity">
                      <button onClick={() => handleDecreaseCart(product)}>-</button>
                      <div className="count">{product.cartQuantity}</div>
                      <button onClick={() => handleAddToCart(product)}>+</button>
                    </div>

                    <div className="cart-product-total-price">
                      ₹{+product.price * product.cartQuantity}
                    </div>

                    <button className="btn" onClick={() => handleRemove(product)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="buttons">
        {addProducts.cartItems.length===0 ? <button className="clear-cart" style={{display:'none'}}>
          Clear Cart
        </button> : <button className="clear-cart" onClick={() => handleClearCart()}>
          Clear Cart
        </button>}
        {/* <button className="clear-cart" onClick={() => handleClearCart()}>
          Clear Cart
        </button> */}

        {addProducts.cartItems.length ===0 ?  <div className="rightPart">
          <div className="totalCard" style={{display:'none'}}>
            <span className="price discountPrice">Discount : - ₹{addProducts.cartTotalDiscount - addProducts.cartTotalAmount}</span>
            <span className="price">Total Amount : ₹{addProducts.cartTotalAmount}</span>
            <span className="saveAmount">You Will Save ₹{addProducts.cartTotalDiscount - addProducts.cartTotalAmount} On This Order</span>
          </div>
        </div> :  <div className="rightPart">
          <div className="totalCard">
            <span className="price discountPrice">Discount : - ₹{addProducts.cartTotalDiscount - addProducts.cartTotalAmount}</span>
            <span className="price">Total Amount : ₹{addProducts.cartTotalAmount}</span>
            <span className="saveAmount">You Will Save ₹{addProducts.cartTotalDiscount - addProducts.cartTotalAmount} On This Order</span>
          </div>
        </div>}
        {/* <div className="rightPart">
          <div className="totalCard">
            <span className="price discountPrice">Discount : - ₹{addProducts.cartTotalDiscount - addProducts.cartTotalAmount}</span>
            <span className="price">Total Amount : ₹{addProducts.cartTotalAmount}</span>
            <span className="saveAmount">You Will Save ₹{addProducts.cartTotalDiscount - addProducts.cartTotalAmount} On This Order</span>
          </div>
        </div> */}
      </div>


      {addProducts.cartItems.length===0 ? <div className="continueShopping" >
        <Link style={{ textDecoration: "none", color: "gray" }} to="/"> ← 
        <span> Continue Shopping </span></Link>
      </div> : <div className="continue-shopping">
        <Link style={{ textDecoration: "none", color: "gray" }} to="/"> ← 
        <span> Continue Shopping </span></Link>
      </div>}
      {/* <div className="continue-shopping">
        <Link style={{ textDecoration: "none", color: "gray" }} to="/"> ← 
        <span> Continue Shopping </span></Link>
      </div> */}
    </div>
  );
};

export default Cart;
