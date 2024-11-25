"use client"
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useState } from 'react'
import classes from '@/components-self/checkout.module.css'



const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);
    
export default function CheckoutBtn({items}) {

    
    const createCheckOutSession = async () => {
      try {
        const cartItems = items
        const stripe = await stripePromise;
        const response = await axios.post('/api/create-stripe-session', { cartItems });
        const sessionId = response.data.id;
  
        const result = await stripe.redirectToCheckout({ sessionId });
  
        if (result.error) {
          alert(result.error.message);
        }
      } catch (error) {
        console.error('Error creating checkout session:', error.message);
        alert('Failed to create checkout session.');
      }
    };
  
  return (
  <button className={classes.checkoutButton} onClick={createCheckOutSession}>Proceed to Checkout</button>
  )
}
