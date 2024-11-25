import Navbar from "@/components-self/Navbar";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function layout({ children }) {
  return (
    <>
    
        <Navbar />
        {children}
    </>
  );
}
