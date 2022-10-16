import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart ,addedItem} from "../store/cartSlice";
import ReactStars from "react-rating-stars-component";
import  {details}  from "../store/productSlice";


const Item = () => {
  const dispatch = useDispatch();
   const selectedProducts = useSelector(details);
   const addProducts = useSelector(addedItem);
    
  const handleAddToCart = (item) => {
      dispatch(addToCart(item));
  };
  const {cartItems} = addProducts;
  console.log(selectedProducts,'<><><><>selectedProducts')
  console.log(cartItems,'<><><><><><><>><><cartItems')
  const selected_product_id = selectedProducts[0].id;
  

 let index ;
  const isProductInCart = () => {
     index = cartItems.findIndex((cartItem) => cartItem.id === selected_product_id);
     
    console.log(index,"<======index")
  }
  isProductInCart();


  return (
    <div className="descProduct">
      {selectedProducts.map((item) => {
        return (
          <div className="details" >
            <div className="big-img">
              <img src={item.img} alt="" />
            
            <div className="box">
              <div className="row">
                <h2>{item.name}</h2>
                <span>₹{item.price}</span> 
                <span className="cutoff">₹{item.actualPrice}</span>
                <span><ReactStars count={5} size={24} activeColor="#ffd700" value={3} edit={false}/></span>
              </div>
              <h5 className="watch-Offer">{item.offer}</h5>
              <p>{item.desc}</p>

           {index === -1 ?
              <button className="cart" onClick={() => handleAddToCart(item)} >Add To Cart</button>
              :<Link to="/cart"><button className="cart">Go To Cart</button></Link>
           }
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
 
export default Item;
