"use client"
import axios from "axios";
import { createContext,useState } from "react"

const CartContext = createContext({
    items:[],
    no_items:0,
    addToCart:function (cartItems){},
    removeFromCart:function (itemId){},
    success:'',
    error:'',
    price:0,
    quantity:0,
    increaseQuantity : function (){},
    decreaseQuantity : function(){}
    
    
})

export function CartProvider(props){

    const [cartItems,setCartItems] = useState([]);
    const [noItems,setNoItems] = useState(0)
    const [success,setSuccess] = useState(null)
    const [error,setError] = useState(null)
    const [totalPrice,setTotalPrice] = useState(0)
    const [quantity,setQuantity] = useState(1)


    function incrQuantity(itemId) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    }
    function decrQuantity(itemId) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId && item.quantity>1
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
      );
    }


    function addItems(email,item) {
        axios
        .post("/api/cart-fun/add", { email,item })
        .then((res) => {        
          if(res.data.status===400){
            setError(res.data.message)
            setTimeout(() => setError(null), 3000);
            

          }
          else if(res.data.status===200){            
            setCartItems((prevItems) => [...prevItems, {...item,quantity:1}]);
            setNoItems((prevCount) => prevCount + 1);
            
            setSuccess('Item added to Cart Successfully!')
            setTimeout(() => setSuccess(null), 3000);
          }
          
          
        })
        .catch((err) => {
          console.error("Failed to add item:", err);
        });
    
      }
    
      function removeItem(email,itemId) {
        axios
        .delete("/api/cart-fun/remove",{
            data:{ email,itemId }
          })
        .then(() => {
          setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
          setNoItems((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
          setSuccess("Item Removed")
        })
        .catch((err) => {
          console.error("Failed to remove item:", err);
        });
    
      }

     
      



    const context = {items:cartItems,no_items:noItems,addToCart:addItems,removeFromCart:removeItem,success:success,error:error,price:totalPrice,quantity:quantity,increaseQuantity:incrQuantity,decreaseQuantity:decrQuantity}
    return(
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext