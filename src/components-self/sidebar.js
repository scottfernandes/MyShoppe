"use client";
import classes from "@/components-self/sidebar.module.css";
import axios from "axios";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Sidebar() {
  const allCategories = [
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
    "Home Decoration",
    "Kitchen Accessories",
    "Laptops",
    "Mens Shirts",
    "Mens Shoes",
    "Mens Watches",
    "Mobile Accessories",
    "Motorcycle",
    "Skin-care",
    "Smartphones",
    "Sports Accessories",
    "Sunglasses",
    "Tablets",
    "Tops",
    "Vehicle",
    "Womens Bags",
    "Womens Dresses",
    "Womens Jewellery",
    "Womens Shoes",
    "Womens Watches",
  ];

  const [selcategories, setSelCategories] = useState(new Set());

  function filterCategories(e,newCategory) {
    if(e.target.checked){
      setSelCategories((prevState)=>(new Set(prevState.add(newCategory))))
    }
    else{
      setSelCategories((prevState)=>{
        const next = new Set(prevState)
        next.delete(newCategory)
        return next
      })
    }
  }


  return (
    <aside className={`${classes.sidebar} ${roboto.className}`}>
      <h2 className={classes.sidebarTitle}>Filter Products</h2>

      <div className={classes.filterSection}>
        <h3 className={classes.sectionTitle}>Categories</h3>
       {allCategories.map(cat=>(
         <label key={cat} htmlFor={cat} className={classes.checkboxLabel}>
         <input type="checkbox" id={cat} onChange={(e)=>filterCategories(e,cat)}/> {cat}
       </label>
       ))}
       
      </div>

      <div className={classes.filterSection}>
        <h3 className={classes.sectionTitle}>Price Range</h3>
        <input type="range" className={classes.rangeSlider} />
        <div className={classes.priceDisplay}>$0 - $1000</div>
      </div>

      <div className={classes.filterSection}>
        <h3 className={classes.sectionTitle}>Rating</h3>
        <label className={classes.radioLabel}>
          <input type="radio" name="rating" /> 5 stars & up
        </label>
        <label className={classes.radioLabel}>
          <input type="radio" name="rating" /> 4 stars & up
        </label>
      </div>

     
    </aside>
  );
}
