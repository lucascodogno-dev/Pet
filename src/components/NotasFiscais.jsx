import React, { useEffect, useState } from "react";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";
import useStore from "../store";

const NotasFiscais = () => {
  const [notas, setNotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchNotas = useStore((state) => state.fetchNotas);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'notas'));
      const notasData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotas(notasData);
    };
    fetchData();
  }, []);

  const filteredNotas = notas.filter((nota) =>
    nota.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Notas Fiscais
      </Typography>
      <TextField
        fullWidth
        label="Pesquisar por nome do cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>CPF/CNPJ</TableCell>
              <TableCell>Pet</TableCell>
              <TableCell>Valor Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNotas.map((nota) => (
              <TableRow key={nota.id}>
                <TableCell>{nota.clientName}</TableCell>
                <TableCell>{nota.cpf}</TableCell>
                <TableCell>{nota.pet}</TableCell>
                <TableCell>{nota.totalValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NotasFiscais;