"use client"
import React, { useContext, useEffect, useState } from "react";
import classes from "@/app/(myshoppe)/products/[products_id]/product.module.css";
import { FaCheckCircle, FaExclamationCircle, FaRegCommentAlt } from "react-icons/fa";
import RatingStars from "@/components-self/Rating";
import CartContext from "@/app/context/CartFunctions";
import axios from "axios";
import { useSession } from "next-auth/react";
import CheckoutBtn from "@/components-self/CheckoutBtn";
import Loader from "../loading";

export default function ProductPage({id}) {
  const [product,setProduct]=useState(null)
  
  const cartCtx = useContext(CartContext)
  
  const {data:session}=useSession()
  const success = cartCtx.success
  const error = cartCtx.error
  

 
  
 
  useEffect(() => {
    const fetchProduct =  () => {

         axios.get(`https://dummyjson.com/products/${id}`)
         .then((response)=>{
          setProduct(response.data)
        })
        .catch((err)=>{
          console.error(err);
          
        })
  
    };

    fetchProduct();
  }, [id]);

  

  if (!product) {
    return <Loader/>
  }
  const cartItem = {
    id:product.id,
    quantity:1,
    image:product.thumbnail,
    title:product.title,
    price:product.price
  }
  function ReturnBtns(){
    if(session){
     return(
     <>
      <button onClick={()=>(cartCtx.addToCart('scottfernandes3586@gmail.com',cartItem))} className={classes.addToCartButton}>Add to Cart</button>
      <CheckoutBtn items={[cartItem]}/>
     </>
     )

    }
    else{
      return <p>You cannot purchase this product unless you are logged in.</p>
    }
  }
  return (
    <div className={classes.productPage}>
      <div className={classes.productContainer}>
        <div className={classes.imageContainer}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={classes.productImage}
          />
        </div>

        <div className={classes.productInfo}>
          <h1 className={classes.productTitle}>{product.title}</h1>
          <div className={classes.deets}>
            <div className={classes.ratings}>
              <RatingStars rating={product.rating} />
              <p>{product.rating}</p>
            </div>
            <div className={classes.revs}>
              <FaRegCommentAlt />
              <p>{product.reviews?.length || 0} reviews</p>
            </div>
            <div className={classes.avail}>
              <FaCheckCircle />
              <p className={classes.stock}>{product.availabilityStatus}</p>
            </div>
          </div>
          <div className={classes.specs}>
            <li>
              Dimensions: {product.dimensions?.width} x{" "}
              {product.dimensions?.height} x {product.dimensions?.depth}
            </li>
            <li>Weight: {product.weight} grams</li>
          </div>
          <p className={classes.productPrice}>${product.price}</p>
          <div className={classes.btncont}>
            <ReturnBtns/>
          </div>
        </div>
        
      </div>

      {success && (
          <div className={`${classes.message} ${classes.successMessage}`}>
            <FaCheckCircle className={classes.icon} />
            <p>{success}</p>
          </div>
        )}
        {error && (
          <div className={`${classes.message} ${classes.errorMessage}`}>
            <FaExclamationCircle className={classes.icon} />
            <p>{error}</p>
          </div>
        )}

        <div className={classes.additionalDetails}>
        <h1>Additional Details</h1>
        <div className={classes.detailsGrid}>
          <div className={classes.detailItem}>
            <strong>Warranty:</strong>
            <p>{product.warrantyInformation}</p>
          </div>
          <div className={classes.detailItem}>
            <strong>Shipping:</strong>
            <p>{product.shippingInformation}</p>
          </div>
          <div className={classes.detailItem}>
            <strong>Return Policy:</strong>
            <p>{product.returnPolicy}</p>
          </div>
          <div className={classes.detailItem}>
            <strong>Minimum Order Quantity:</strong>
            <p>{product.minimumOrderQuantity}</p>
          </div>
        </div>

        </div>
        <div className={classes.reviewsSection}>
          <h1>Reviews</h1>
          <div className={classes.allReviews}>
          {product.reviews?.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className={classes.review}>
                <p>
                  <strong>{review.reviewerName}</strong> (
                  {review.date.split("T")[0]})
                </p>
                <RatingStars rating={review.rating} />
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
          </div>
        </div>
      </div>
  );
}
