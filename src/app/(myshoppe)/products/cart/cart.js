"use client"

import React, { useContext, useEffect, useState } from 'react';
import classes from '@/app/(myshoppe)/products/cart/cart.module.css';
import { Roboto } from 'next/font/google';
import CheckoutBtn from '@/components-self/CheckoutBtn';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import CartContext from '@/app/context/CartFunctions';
import axios from 'axios';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function CartPage() {

  const {data:session} = useSession()
  const [allItems,setAllItems] = useState([])
  if(!session){
    redirect('/login')
  }


  useEffect(() => {
    axios
        .get(`/api/cart-fun/show?email=scottfernandes3586@gmail.com`)
        .then((response) => {
          setAllItems(response.data.cartItems);
        })
        .catch((err) => {
          console.error("Failed to show items:", err);
        });
  }, [])
  


  
  return (
    <div className={`${classes.cartContainer} ${roboto.className}`}>
      <h1 className={classes.title}>Your Cart</h1>
      
      <div className={classes.cartContent}>
        <div className={classes.cartItems}>
          {allItems.map((item)=>(
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
                <button className={classes.decrementButton}>-</button>
                <span className={classes.quantity}>1</span>
                <button className={classes.incrementButton}>+</button>
              </div>
            </div>
            <button className={classes.removeButton}>Remove</button>
          </div>
          ))}
        </div>

        <div className={classes.cartSummary}>
          <h2 className={classes.summaryTitle}>Order Summary</h2>
          <div className={classes.summaryItem}>
            <span>Subtotal</span>
            <span>$75.00</span>
          </div>
          
          <div className={classes.summaryTotal}>
            <span>Total</span>
            <span>$80.00</span>
          </div>
         <CheckoutBtn items={allItems} />
        </div>
      </div>
    </div>
  );
}



