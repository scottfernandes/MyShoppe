"use client"
import React, { useState,useRef } from 'react';
import classes from '@/app/(myshoppe)/login/login.module.css';
import Link from 'next/link';
import logo from '@/assets/cart-icon.png';
import Image from 'next/image';
import { Roboto } from 'next/font/google';
import { signIn,signOut, useSession } from "next-auth/react"; 
import { redirect, useRouter } from 'next/navigation';
import Loader from '@/app/loading';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});


export default function LoginForm() {

  const {data:session,status} = useSession()
  const router = useRouter();

  if (status === "authenticated") {
    redirect("/my-profile");
  }

  if (status === "loading") {
    return <div><Loader/></div>;
  }
  
  const emailRef = useRef()
  const passRef = useRef()

 
  const [pass,showPass] = useState(false)

  async function submitForm(e){
    e.preventDefault()
    const enteredMail = emailRef.current.value
    const enteredPass = passRef.current.value
    try{
      const result =await signIn('credentials',{redirect:'/products',email:enteredMail,password:enteredPass})
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
          Login
        </div>

        <form className={classes.form} onSubmit={submitForm}>
         
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
            Login
          </button>
        </form>

        <p className={classes.loginLink}>
          New here? <Link href="/signup">Sign Up</Link>
        </p>
      </div>

      
    </div>
  );
}
