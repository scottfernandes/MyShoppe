"use client"

import React, {useContext, useEffect, useState } from 'react';
import classes from '@/app/(myshoppe)/products/cart/cart.module.css';
import { Roboto } from 'next/font/google';
import CheckoutBtn from '@/components-self/CheckoutBtn';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import axios from 'axios';
import CartContext from '@/app/context/CartFunctions';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function CartPage() {

  const {data:session} = useSession()
  const [allItems,setAllItems] = useState([])
  const[total,setTotal] = useState(0)
  if(!session){
    redirect('/login')
  }
  const cartCtx = useContext(CartContext)
  function getTotal(items){
    console.log(items);
    
    const totalPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    console.log(totalPrice);
    
    setTotal(totalPrice)
  }

  useEffect(() => {
    axios
        .get(`/api/cart-fun/show?email=scottfernandes3586@gmail.com`)
        .then((response) => {
          setAllItems(response.data.cartItems);
          getTotal(response.data.cartItems)
        })
        .catch((err) => {
          console.error("Failed to show items:", err);
        });
  }, [])
  
  
  
  return (
    <div className={`${classes.cartContainer} ${roboto.className}`}>
      <h1 className={classes.title}>Cart Details of {session.user.name.split(' ')[0]} </h1>
      
      <div className={classes.cartContent}>
        <div className={classes.cartItems}>
          {allItems.map((item,index)=>(
            <div key={item.id} className={classes.cartItem}>
            <img 
              src={item.image}
              alt={item.title}
              className={classes.productImage}
            />
            <div className={classes.productDetails}>
              <h2 className={classes.productName}>{item.title}</h2>
              <p className={classes.productPrice}>${item.price}</p>
              <div className={classes.quantityControl}>
                <button onClick={()=>cartCtx.decreaseQuantity(item.id)} className={classes.decrementButton}>-</button>
                <span className={classes.quantity}>{cartCtx.quantity}</span>
                <button onClick={()=>cartCtx.increaseQuantity(item.id)} className={classes.incrementButton}>+</button>
              </div>
            </div>
            <button onClick={()=>cartCtx.removeFromCart('scottfernandes3586@gmail.com',item.id)} className={classes.removeButton}>Remove</button>
          </div>
          ))}
        </div>

        <div className={classes.cartSummary}>
          <h2 className={classes.summaryTitle}>Order Summary</h2>
          <div className={classes.summaryItem}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          

          <div className={classes.summaryTotal}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={classes.sumBtn}>
         <CheckoutBtn items={allItems} />
          </div>
        </div>
      </div>
    </div>
  );
}



