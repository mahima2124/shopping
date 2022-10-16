import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cartItem);
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="navbar-heading">
        {location.pathname === "/signUp" || location.pathname === "/login" ? (
          <i className="fa fa-shopping-bag"></i>
        ) : (
          <Link to="/"> <i className="fa fa-shopping-bag"></i></Link>
        )} ONLINE SHOPPING
      </div>

      {location.pathname === "/signUp" || location.pathname === "/login" ? (
        <div className="cart-icon" style={{ display: "none" }}>
          <i className="fa fa-shopping-cart fa-2x " aria-hidden="true"></i>
          <span className="bag-quantity">{cartTotalQuantity}</span>
        </div>
      ) : (
        <div className="cart-icon">
          <Link to="/cart">
            <i className="fa fa-shopping-cart fa-2x " aria-hidden="true"></i>
          </Link>
          <span className="bag-quantity">{cartTotalQuantity}</span>
        </div>
      )}

      {location.pathname === "/signUp" || location.pathname === "/login" ? (
        <div className="logout-icon" style={{ display: "none" }}>
          <i class="fa fa-sign-out" aria-hidden="true"></i>
        </div>
      ) : (
        <div className="logout-icon">
          <Link to="/login">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
