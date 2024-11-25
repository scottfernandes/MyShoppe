"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/cart-icon.png";
import Link from "next/link";
import classes from "@/components-self/navbar.module.css";
import { Poppins, Roboto } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { IoCartSharp } from "react-icons/io5";
const roboto = Poppins({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
});

export default function Navbar() {
  const { data: session } = useSession();
  function NavContent() {
    if (session) {
      return (
        <ul>
          <li>
            <Link href={"/products"}>
             Products
            </Link>
          </li>
          <li>
            <Link href={"/my-profile"}>
             Profile
            </Link>
          </li>
          <li>
            <Link href={"/"} onClick={signOut}>
              Logout
            </Link>
          </li>
          <li>
            <Link href={"/products/cart"}>
              <IoCartSharp />
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link href={"/signup"}>Sign Up</Link>
          </li>
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact Us</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <>
      <header className={`${classes.header} ${roboto.className}`}>
        <Link href="/" className={classes.logo}>
          <Image src={logo} width={50} alt="MyShoppe" priority />
          MYSHOPPE
        </Link>

        <nav className={classes.nav}>
          <NavContent />
        </nav>
      </header>
    </>
  );
}
