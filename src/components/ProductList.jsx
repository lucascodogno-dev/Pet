import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import useStore from "../store";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const ProductList = () => {
  const { products, fetchProducts, updateProduct, deleteProduct } = useStore();
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    console.log("products carregados:", products);
  }, [products]);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditedName(product.name);
    setEditedPrice(product.price.toString());
  };

  const handleSave = async (id) => {
    await updateProduct(id, {
      name: editedName,
      price: parseFloat(editedPrice),
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {products <= 0 ? (
        <Typography variant="h4" gutterBottom align="center">
         Não Possui Produtos Cadastrados
        </Typography>
      ) : (
        <Typography variant="h4" gutterBottom align="center">
          Produtos Cadastrados
        </Typography>
      )}

      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                minWidth: 250,
                textAlign: "center",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CardContent>
                {editingId === product.id ? (
                  <>
                    <TextField
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      size="small"
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                      size="small"
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <Button
                      onClick={() => handleSave(product.id)}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <Save /> Salvar
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outlined"
                      color="secondary"
                      size="small"
                    >
                      <Cancel /> Cancelar
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" color="primary">
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {formatCurrency(product.price)}
                    </Typography>
                    <IconButton
                      onClick={() => handleEdit(product)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteProduct(product.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
