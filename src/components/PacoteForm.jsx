
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import useStore from '../store';

// const PacoteForm = () => {
//   const { pacotes, fetchPacotes, addPacote, updatePacote, deletePacote } = useStore();
//   const [tipoServico, setTipoServico] = useState('');
//   const [nomePacote, setNomePacote] = useState('');
//   const [preco, setPreco] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [message, setMessage] = useState({ text: '', type: '' });

//   useEffect(() => {
//     fetchPacotes();
//   }, [fetchPacotes]);

//   const handleSave = async () => {
//     if (!tipoServico || !nomePacote || !preco) return;

//     try {
//       if (editingId) {
//         await updatePacote(editingId, { tipoServico, nomePacote, preco: parseFloat(preco) });
//         setMessage({ text: 'Pacote atualizado com sucesso!', type: 'success' });
//       } else {
//         await addPacote({ tipoServico, nomePacote, preco: parseFloat(preco) });
//         setMessage({ text: 'Pacote adicionado com sucesso!', type: 'success' });
//       }
//       setTipoServico('');
//       setNomePacote('');
//       setPreco('');
//       setEditingId(null);
//     } catch (error) {
//       setMessage({ text: 'Erro ao salvar o pacote.', type: 'error' });
//     }
//   };

//   const handleEdit = (pacote) => {
//     setTipoServico(pacote.tipoServico);
//     setNomePacote(pacote.nomePacote);
//     setPreco(pacote.preco);
//     setEditingId(pacote.id);
//   };

//   return (
//     <Container maxWidth="md">
//       <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
//         <Typography variant="h5" gutterBottom>
//           {editingId ? 'Editar Pacote' : 'Adicionar Pacote'}
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Tipo de Serviço"
//               value={tipoServico}
//               onChange={(e) => setTipoServico(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Nome do Pacote"
//               value={nomePacote}
//               onChange={(e) => setNomePacote(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Preço"
//               type="number"
//               value={preco}
//               onChange={(e) => setPreco(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button fullWidth variant="contained" color="primary" onClick={handleSave}>
//               {editingId ? 'Atualizar Pacote' : 'Adicionar Pacote'}
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       <Snackbar open={!!message.text} autoHideDuration={3000} onClose={() => setMessage({ text: '', type: '' })}>
//         <Alert severity={message.type}>{message.text}</Alert>
//       </Snackbar>

//       <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Tipo de Serviço</TableCell>
//               <TableCell>Nome do Pacote</TableCell>
//               <TableCell>Preço</TableCell>
//               <TableCell>Ações</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {pacotes.map((pacote) => (
//               <TableRow key={pacote.id}>
//                 <TableCell>{pacote.tipoServico}</TableCell>
//                 <TableCell>{pacote.nomePacote}</TableCell>
//                 <TableCell>R$ {pacote.preco.toFixed(2)}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleEdit(pacote)}>
//                     <Edit color="primary" />
//                   </IconButton>
//                   <IconButton onClick={() => deletePacote(pacote.id)}>
//                     <Delete color="secondary" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };
const PacoteForm = () => {
  const { pacotes, fetchPacotes, addPacote, updatePacote, deletePacote } = useStore();
  const [tipoServico, setTipoServico] = useState('');
  const [nomePacote, setNomePacote] = useState('');
  const [preco, setPreco] = useState('');
  const [numBanhos, setNumBanhos] = useState(1); // Novo estado para número de banhos
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchPacotes();
  }, [fetchPacotes]);

  const handleSave = async () => {
    if (!tipoServico || !nomePacote || !preco) return;

    try {
      if (editingId) {
        await updatePacote(editingId, { tipoServico, nomePacote, preco: parseFloat(preco), numBanhos });
        setMessage({ text: 'Pacote atualizado com sucesso!', type: 'success' });
      } else {
        await addPacote({ tipoServico, nomePacote, preco: parseFloat(preco), numBanhos });
        setMessage({ text: 'Pacote adicionado com sucesso!', type: 'success' });
      }
      setTipoServico('');
      setNomePacote('');
      setPreco('');
      setNumBanhos(1);
      setEditingId(null);
    } catch (error) {
      setMessage({ text: 'Erro ao salvar o pacote.', type: 'error' });
    }
  };

  const handleEdit = (pacote) => {
    setTipoServico(pacote.tipoServico);
    setNomePacote(pacote.nomePacote);
    setPreco(pacote.preco);
    setNumBanhos(pacote.numBanhos);
    setEditingId(pacote.id);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          {editingId ? 'Editar Pacote' : 'Adicionar Pacote'}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tipo de Serviço"
              value={tipoServico}
              onChange={(e) => setTipoServico(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome do Pacote"
              value={nomePacote}
              onChange={(e) => setNomePacote(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Preço"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Número de Banhos"
              type="number"
              value={numBanhos}
              onChange={(e) => setNumBanhos(parseInt(e.target.value, 10))}
              inputProps={{ min: 1, max: 5 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleSave}>
              {editingId ? 'Atualizar Pacote' : 'Adicionar Pacote'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar open={!!message.text} autoHideDuration={3000} onClose={() => setMessage({ text: '', type: '' })}>
        <Alert severity={message.type}>{message.text}</Alert>
      </Snackbar>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tipo de Serviço</TableCell>
              <TableCell>Nome do Pacote</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Número de Banhos</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacotes.map((pacote) => (
              <TableRow key={pacote.id}>
                <TableCell>{pacote.tipoServico}</TableCell>
                <TableCell>{pacote.nomePacote}</TableCell>
                <TableCell>R$ {pacote.preco.toFixed(2)}</TableCell>
                <TableCell>{pacote.numBanhos}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(pacote)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => deletePacote(pacote.id)}>
                    <Delete color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


export default PacoteForm;
