"use client";
import React, { useState } from 'react'
import PageContainer from '../../components/container/PageContainer'
import DashboardCard from '../../components/shared/DashboardCard'
import { Typography } from '@mui/material'
import ProductForm from '@/components/form/Product';
import { ProductPayload } from '@/interfaces/product';
import useFirebase from '@/hooks/useFirebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false)

  const { db, storage } = useFirebase()

  const handleSaveProduct = async (product: ProductPayload) => {
    if (loading) return;
    try {
      setLoading(true);

      const mimetype = product.image.split(';')[0].split('/')[1];
      const imageRef = ref(storage, `products/${uuid()}.${mimetype}`);
      await uploadString(imageRef, product.image, 'data_url');

      const imageUrl = await getDownloadURL(imageRef);
      product.image = imageUrl;

      const docRef = await addDoc(collection(db, "products"), product);
      alert("Producto añadido correctamente! id: " + docRef.id);
    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer title='Añadir Producto' description='Aqui puedes añadir un producto'>
      <DashboardCard title="Formulario de producto">
        <ProductForm callbackProduct={handleSaveProduct} loading={loading} />
      </DashboardCard>
    </PageContainer>
  )
}
