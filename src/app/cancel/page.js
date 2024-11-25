import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
        <h1>Oops!</h1>
        <p>The Payment could not proceed. Click here to return to the page</p>
        <Link href={'/products/cart'}><button>Return to Cart</button></Link>
    </div>
  )
}
