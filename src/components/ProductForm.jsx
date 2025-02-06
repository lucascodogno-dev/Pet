
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box, Container, Snackbar } from '@mui/material';
import useStore from '../store';
import ProductList from './ProductList';

const formatCurrency = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const addProduct = useStore((state) => state.addProduct);

  const handlePriceChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    let formattedValue = (parseFloat(rawValue) / 100).toFixed(2); // Converte para decimal
    setPrice(formattedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, price: parseFloat(price) || 0 }; // Converte para número antes de salvar
    await addProduct(product);
    setName('');
    setPrice('');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Cadastrar Produto
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Valor"
            variant="outlined"
            value={formatCurrency(price)}
            onChange={handlePriceChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Cadastrar
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Produto cadastrado com sucesso!"
      />

      <ProductList />
    </Container>
  );
};

export default ProductForm;