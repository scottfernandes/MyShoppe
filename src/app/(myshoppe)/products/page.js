import Sidebar from '@/components-self/sidebar';
import React from 'react';
import classes from '@/app/(myshoppe)/products/page.module.css';
import Link from 'next/link';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default async function Page() {
    let allProducts;

    const response = await fetch('https://dummyjson.com/products');
    if(response.ok){
        const productPromise = await response.json();
        allProducts = productPromise.products;
        
    } else {
        console.log('Error returning products');
    }

    return (
        <div className={`${classes.main} ${roboto.className}`}>
            <div className={classes.sidebar}>
                <Sidebar />
            </div>
            <div className={classes.gridCards}>
                {allProducts.map((product) => (
                    <Link key={product.id} className={classes.link} href={`/products/${product.id}`}>
                        <div key={product.id} className={classes.card}>
                            <img 
                                src={product.thumbnail} 
                                alt={product.title} 
                                className={classes.productImage} 
                            />
                            <div className={classes.cardContent}>
                                <h2 className={classes.productTitle}>{product.title}</h2>
                                <p className={classes.productPrice}>${product.price}</p>
                                
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
