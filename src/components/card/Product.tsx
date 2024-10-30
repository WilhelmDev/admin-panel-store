import { Product } from '@/interfaces/product'
import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

type Props = {
  product: Product,
}

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <Box sx={{ position: 'relative', paddingTop: '100%' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            // height: '100%',
            objectFit: 'cover',
            aspectRatio: 1,
          }}
        />
      </Box>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="body2">Price: ${product.price}</Typography>
      </CardContent>
    </Card>
  )
}