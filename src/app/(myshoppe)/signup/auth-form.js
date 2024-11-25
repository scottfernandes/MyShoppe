"use client"
import React, { useState,useRef } from 'react';
import classes from '@/app/(myshoppe)/signup/auth.module.css';
import Link from 'next/link';
import logo from '@/assets/cart-icon.png';
import Image from 'next/image';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});



async function createUser(name,email,password) {
  const response = await fetch('/api/auth',{
    method:'POST',
    body:JSON.stringify({name,email,password}),
    headers:{
      'Content-Type':'application/json'
    }
  })
  const data = await response.json()
  console.log(data);
  
  if (!response.ok){
    throw new Error("Error adding user")
  }


  return data
}


export default function SignupForm() {


  const emailRef = useRef()
  const passRef = useRef()
  const nameRef = useRef()

 
  const [pass,showPass] = useState(false)

  async function submitForm(e){
    e.preventDefault()
    const enteredName = nameRef.current.value
    const enteredMail = emailRef.current.value
    const enteredPass = passRef.current.value
    try{
      const result = await createUser(enteredName,enteredMail,enteredPass)
      console.log(result);
      
    } 
    catch(error){
      console.log(error);
      
    }
  }

  return (
    <div className={`${classes.container} ${roboto.className}`}>
      <div className={classes.signupBox}>
        <div className={classes.logo}>
          <Image src={logo} width={50} alt='MyShoppe' priority />
          Sign Up
        </div>

        <form className={classes.form} onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Full Name"
            className={classes.input}
            required
            ref={nameRef}
          />
          <input
            type="email"
            placeholder="Email"
            className={classes.input}
            required
            ref={emailRef}
          />
          <input
            type={pass?"text":"password"}
            placeholder="Password"
            className={classes.input}
            required
            ref={passRef}
          />

          <div className={classes.checkboxContainer}>

          <input type='checkbox' id='pass' className={classes.customCheckbox} onChange={()=>showPass(!pass)}/>
          <label htmlFor='pass'>Show Password</label>
          </div>
         
          
          <button type="submit" className={classes.signupButton}>
            Create Account
          </button>
        </form>

        <p className={classes.loginLink}>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>

      
    </div>
  );
}
