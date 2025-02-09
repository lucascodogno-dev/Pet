import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Adicionado para redirecionamento
import useStore from '../store';
import { validateCPF, validateCNPJ } from '../validators';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const ClientForm = () => {
  const [name, setName] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Estado para sucesso
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { addClient, clients } = useStore();
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de CPF/CNPJ
    const isCPF = cpfCnpj.length === 11 || cpfCnpj.length === 14;
    const isValidCPF = isCPF && validateCPF(cpfCnpj);
    const isValidCNPJ = !isCPF && validateCNPJ(cpfCnpj);

    if (!isValidCPF && !isValidCNPJ) {
      setError('CPF ou CNPJ inválido.');
      setOpenSnackbar(true);
      return;
    }

    // Verifica se o CPF/CNPJ já existe
    const exists = clients.some((client) => client.cpfCnpj === cpfCnpj);
    if (exists) {
      setError('CPF/CNPJ já cadastrado.');
      setOpenSnackbar(true);
      return;
    }

    // Cadastra o cliente
    const client = { name, cpfCnpj, phone };
    try {
      await addClient(client); // Usa a função addClient do store
      setName('');
      setCpfCnpj('');
      setPhone('');
      setError('');
      setSuccess(true); // Define sucesso como true
      setOpenSnackbar(true); // Exibe o Snackbar de sucesso
    } catch (error) {
      setError('Erro ao cadastrar cliente.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccess(false); // Reseta o estado de sucesso ao fechar o Snackbar
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Cadastrar Cliente
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="CPF/CNPJ"
            value={cpfCnpj}
            onChange={(e) => setCpfCnpj(e.target.value.replace(/\D/g, ''))} // Remove caracteres não numéricos
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Remove caracteres não numéricos
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Cadastrar
          </Button>
        </form>

        {/* Botão para visualizar clientes */}
        <Button
          variant="outlined"
          color="secondary"
          style={{ marginTop: '20px' }}
          onClick={() => navigate('/clients')} // Redireciona para a lista de clientes
        >
          Visualizar Clientes <ArrowForwardIcon/>
        </Button>
      </Paper>

      {/* Snackbar para exibir mensagens de erro ou sucesso */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? 'success' : 'error'} // Define o tipo de alerta
          sx={{ width: '100%' }}
        >
          {success ? 'Cliente cadastrado com sucesso!' : error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ClientForm;
