import { Inter, Playfair_Display, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
import classes from "@/app/page.module.css";
import ImageSlideshow from "@/components-self/image-slideshow";
import Link from "next/link";
import Footer from '@/components-self/Footer';

export default function Home() {

  return (
    <>
      <section className={`${classes.hero} ${playfair.className}`}>
        <div className={classes.heroContent}>
          <h1>
            Welcome to <span className={classes.span_text}>MyShoppe</span>
          </h1>
          <p>
            Your one-stop shop for fashion, electronics, and home essentials.
          </p>
         
          <Link href={'/products'}>
            <button className={`${classes.ctaButton} ${inter.className}`}>SHOP NOW</button>
          </Link>
        </div>
        <div></div>
      </section>

      <section className={`${classes.shopWithUs} ${roboto.className}`}>
        <h2>Why Shop With <span className={classes.span_text}>MyShoppe?</span></h2>
        <div className={classes.shopWithUsContent}>
          <div className={classes.feature}>
            <h3>Top Quality</h3>
            <p>
              Every item is carefully selected to ensure premium quality and
              durability, so you can shop with confidence.
            </p>
          </div>
          <div className={classes.feature}>
            <h3>Exclusive Deals</h3>
            <p>
              Sign up for our newsletter to access exclusive discounts and first
              looks at new arrivals.
            </p>
          </div>
          <div className={classes.feature}>
            <h3>Fast & Free Shipping</h3>
            <p>
              Enjoy free shipping on all orders over $50, delivered straight to
              your door.
            </p>
          </div>
          <div className={classes.feature}>
            <h3>Easy Returns</h3>
            <p>
              Not 100% happy with your purchase? Our hassle-free return policy
              makes returns simple and quick.
            </p>
          </div>
        </div>
      </section>

      <section className={`${classes.cat} ${playfair.className}`}>
        <div>
          <h1>
            Explore our <span className={classes.span_text}>Categories</span>
          </h1>
          <div className={classes.allCategories}>
           <ImageSlideshow/>
          </div>
        </div>
      </section>

      <div>
        <Footer/>
      </div>
    </>
  );
}
