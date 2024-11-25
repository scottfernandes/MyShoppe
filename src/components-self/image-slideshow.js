"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "@/components-self/image-slideshow.module.css";
import electronics from "@/assets/electronics.webp";
import home from "@/assets/home.jpg";
import fashion from "@/assets/fashion.webp";
import Link from "next/link";

export default function ImageSlideshow() {
  const categories = [
    {
      category: "Fashion",
      description:
        "Discover the latest trends in fashion, from stylish apparel and cutting-edge accessories to shoes that make a statement. Our curated collections offer something for every occasion, whether you’re dressing for the office, a night out, or a weekend getaway. Dive into seasonal styles and timeless classics, with options that cater to every taste and personality.",
      image: fashion,
      alt: "Fashion"
    },
    {
      category: "Home & Living",
      description:
        "Create a home that’s uniquely yours with our Home & Living essentials. From cozy, elegant furniture to must-have kitchen tools and decor that sets the mood, our selection transforms spaces into reflections of personal style. Discover everything you need to make each room functional and beautiful—whether you’re designing a relaxing bedroom retreat, an inspiring home office, or a vibrant living room. With pieces that suit various tastes and budgets.",
      image: home,
      alt: "Home & Living"
    },
    {
      category: "Electronics",
      description:
        "Stay ahead in a connected world with our range of electronics and tech accessories. From state-of-the-art smartphones and powerful laptops to essential home gadgets and cutting-edge wearables, explore devices that keep you productive and entertained. Whether you’re a tech enthusiast or just looking for reliable devices that suit your lifestyle, our electronics category brings together the latest advancements in technology.",
      image: electronics,
      alt: "Electronics"
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < categories.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {categories.map((item, index) => (
        <div
          key={index}
          className={`${classes.content} ${
            index === currentIndex ? classes.active : ""
          }`}
        >
          <div className={classes.text}>
            <h1>{item.category}</h1>
            <p>{item.description}</p>
            <Link href={'/products'}><button className={classes.btn}>Explore now</button></Link>
          </div>
          <Image src={item.image} alt={item.alt} className={classes.image} />
        </div>
      ))}
    </div>
  );
}
