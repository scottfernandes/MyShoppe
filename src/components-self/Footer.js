import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import classes from '@/components-self/footer.module.css';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        
        <div className={classes.section}>
          <h3>About Us</h3>
          <p>
            Welcome to MyShoppe! We are committed to providing you with the best
            quality products and an excellent shopping experience.
          </p>
        </div>

        <div className={classes.section}>
          <h3>Quick Links</h3>
          <ul className={classes.linkList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={classes.section}>
          <h3>Follow Us</h3>
          <div className={classes.socialIcons}>
            <Link href="https://facebook.com"><FaFacebook className={classes.icon} /></Link>
            <Link href="https://twitter.com"><FaTwitter className={classes.icon} /></Link>
            <Link href="https://instagram.com"><FaInstagram className={classes.icon} /></Link>
            <Link href="https://linkedin.com"><FaLinkedin className={classes.icon} /></Link>
          </div>
        </div>

        <div className={classes.section}>
          <h3>Contact Us</h3>
          <p>Email: support@myshoppe.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 1234 MyShoppe Street, E-commerce City, 12345</p>
        </div>
      </div>

      <div className={classes.bottomBar}>
        <p>&copy; {new Date().getFullYear()} MyShoppe. All rights reserved.</p>
      </div>
    </footer>
  );
}
