import React from 'react'
import ProductPage from './product'

export default async function page({params}) {

    const id = params.products_id
    
  return (
   <ProductPage id={id}/> 
  )
}
