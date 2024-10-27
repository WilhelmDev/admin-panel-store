"use client";
import React from 'react'
import PageContainer from '../../components/container/PageContainer'
import DashboardCard from '../../components/shared/DashboardCard'
import { Typography } from '@mui/material'
import ProductForm from '@/components/form/Product';

export default function AddProductPage() {
  return (
    <PageContainer title='Añadir Producto' description='Aqui puedes añadir un producto'>
      <DashboardCard title="Formulario de producto">
        <ProductForm />
      </DashboardCard>
    </PageContainer>
  )
}
