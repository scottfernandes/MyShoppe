"use client"
import axios from "axios";
import { createContext,useState } from "react"

const CartContext = createContext({
    items:[],
    no_items:0,
    addToCart:function (cartItems){},
    removeFromCart:function (itemId){},
    
})

export function CartProvider(props){

    const [cartItems,setCartItems] = useState([]);
    const [noItems,setNoItems] = useState(0)


    function addItems(email,item) {
        axios
        .post("/api/cart-fun/add", { email,item })
        .then(() => {            
          setCartItems((prevItems) => [...prevItems, item]);
          setNoItems((prevCount) => prevCount + 1);
          console.log("Item added:", item,"Email:",email);
        })
        .catch((err) => {
          console.error("Failed to add item:", err);
        });
    
      }
    
      function removeItem(itemId) {
        axios
        .delete("/api/cart-fun/remove", { data: { itemId } })
        .then(() => {
          setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
          setNoItems((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
          console.log("Item removed:", itemId);
        })
        .catch((err) => {
          console.error("Failed to remove item:", err);
        });
    
      }

     
      



    const context = {items:cartItems,no_items:noItems,addToCart:addItems,removeFromCart:removeItem,}
    return(
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext