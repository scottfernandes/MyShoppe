import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from './rating.module.css';

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating); 
  const halfStar = rating % 1 >= 0.5; 
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); 

  return (
    <div className={styles.ratingStars}>
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={`full-${index}`} className={`${styles.star} ${styles.full}`} />
        ))}
      {halfStar && <FaStarHalfAlt className={`${styles.star} ${styles.half}`} />}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} className={`${styles.star} ${styles.empty}`} />
        ))}
    </div>
  );
};

export default RatingStars;
