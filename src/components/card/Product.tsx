import useFirebase from '@/hooks/useFirebase'
import { Product } from '@/interfaces/product'
import { Box, Card, CardContent, CardMedia, Chip, Stack, Switch, Typography } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'

type Props = {
  product: Product,
}

export default function ProductCard({ product }: Props) {
  const { db } = useFirebase()

  const changeState = async () => {
    const ref = doc(db, 'products', product.id);
    await updateDoc(ref, { active: !product.active });
  };

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
            height: '100%',
            objectFit: 'cover',
            aspectRatio: 1,
          }}
        />
      </Box>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body1">{product.description}</Typography>
        <Typography variant="body1">
          Precio: <span style={{fontWeight: 700}}>{product.price}$</span>
        </Typography>
        <Stack direction='row' spacing={1}>
          <Typography variant="body1">
            Activo:
          </Typography>
          <Switch size='small' checked={product.active} onChange={changeState} inputProps={{ 'aria-label': 'controlled' }}/>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip label={product.category} size="small" color='info' style={{marginTop: '5px'}}/>
        </Stack>
      </CardContent>
    </Card>
  )
}