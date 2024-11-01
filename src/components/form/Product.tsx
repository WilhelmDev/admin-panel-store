import { Avatar, Box, Button, CircularProgress, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IconPhotoUp } from '@tabler/icons-react';
import { ProductPayload } from '@/interfaces/product';

type Props = {
  callbackProduct: (product: ProductPayload) => void;
  loading: boolean;
}

export default function ProductForm({ callbackProduct, loading }: Props) {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Toys',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...product,
      price: parseFloat(product.price),
      image: image || '',
      active: false,
    }
    callbackProduct(payload);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={handleImageClick}
              sx={{
                width: {
                  xs: '100%',
                  md: '30%'
                },
                maxWidth: 600,
                border: !image ? '1px dashed grey' : '',
                aspectRatio: 1,
              }}
            >
              {image ? (
                <Avatar
                  src={image}
                  sx={{ width: '100%', height:'100%', boxShadow: '0 10px 10px rgba(0,0,0,.25)'}}
                  variant="square"
                />
              ) : (
                <IconPhotoUp size={60} />
              )}
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            label="Nombre del producto"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="description"
            label="Descripción"
            name="description"
            multiline
            rows={4}
            value={product.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="price"
            label="Precio"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Typography>$</Typography>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            required
            fullWidth
            id="category"
            label="Categoría"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 3, mb: 2, py: 2, ':disabled': { opacity: 0.5  }}}
      >
        {loading 
          ? <Box alignContent={'center'} alignItems={'center'}><CircularProgress size={30} /></Box> 
          : 'Añadir producto' }
      </Button>
    </Box>
  )
}