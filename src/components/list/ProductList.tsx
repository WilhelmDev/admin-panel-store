import { Product } from '@/interfaces/product'
import { Grid } from '@mui/material'
import React from 'react'
import ProductCard from '../card/Product'

type Props = {
  elements: Product[]
}

export default function ProductList({ elements }: Props) {
  return (
    <Grid container spacing={2}>
      {elements.map((product) => (
        <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
