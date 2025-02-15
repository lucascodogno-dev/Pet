
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Collapse,
//   IconButton,
//   Modal,
//   Button,
//   Grid,
// } from "@mui/material";
// import { ExpandMore, ExpandLess, ArrowForward } from "@mui/icons-material";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import useStore from "../store";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// // Função para formatar a data
// const formatarData = (data) => {
//   if (!data || !(data instanceof Date) || isNaN(data)) {
//     return "Data inválida";
//   }

//   const dia = String(data.getDate()).padStart(2, "0");
//   const mes = String(data.getMonth() + 1).padStart(2, "0");
//   const ano = data.getFullYear();

//   return `${dia}/${mes}/${ano}`;
// };

// // Componente DonutChart
// const DonutChart = ({ data }) => {
//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         data={data}
//         cx={200}
//         cy={200}
//         innerRadius={60}
//         outerRadius={80}
//         fill="#8884d8"
//         paddingAngle={5}
//         dataKey="value"
//         label
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend />
//     </PieChart>
//   );
// };

// const NotasFiscais = () => {
//   const [clientesComNotas, setClientesComNotas] = useState([]);
//   const [notasDoCliente, setNotasDoCliente] = useState([]);
//   const [clienteSelecionado, setClienteSelecionado] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [clienteDetalhado, setClienteDetalhado] = useState(null);
//   const [notasPorMes, setNotasPorMes] = useState({});

//   // Busca as notas fiscais e agrupa por cliente
//   useEffect(() => {
//     const fetchNotas = async () => {
//       const querySnapshot = await getDocs(collection(db, 'notas'));
//       const notasData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       console.log(notasData);

//       // Agrupa as notas por cliente
//       const clientesAgrupados = notasData.reduce((acc, nota) => {
//         if (!acc[nota.cpf]) {
//           acc[nota.cpf] = {
//             nome: nota.clientName,
//             cpf: nota.cpf,
//             notas: [],
//           };
//         }
//         acc[nota.cpf].notas.push(nota);
//         return acc;
//       }, {});

//       // Converte o objeto em uma array
//       setClientesComNotas(Object.values(clientesAgrupados));

//       // Agrupa as notas por mês e cliente
//       const notasAgrupadasPorMes = notasData.reduce((acc, nota) => {
//         const dataNota = new Date(nota.banhoDates[0]);
//         const mes = `${dataNota.getFullYear()}-${dataNota.getMonth() + 1}`;

//         if (!acc[mes]) {
//           acc[mes] = {};
//         }

//         if (!acc[mes][nota.cpf]) {
//           acc[mes][nota.cpf] = 0;
//         }

//         acc[mes][nota.cpf] += 1;

//         return acc;
//       }, {});

//       setNotasPorMes(notasAgrupadasPorMes);
//     };

//     fetchNotas();
//   }, []);

//   // Filtra os clientes com base no termo de pesquisa
//   const filteredClientes = clientesComNotas.filter((cliente) =>
//     cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Função para exibir/ocultar as notas de um cliente
//   const handleClienteClick = (cpf) => {
//     if (clienteSelecionado === cpf) {
//       setClienteSelecionado(null); // Fecha a tabela se o mesmo cliente for clicado novamente
//       setNotasDoCliente([]);
//     } else {
//       const cliente = clientesComNotas.find((c) => c.cpf === cpf);
//       setClienteSelecionado(cpf);
//       setNotasDoCliente(cliente.notas);
//     }
//   };

//   // Função para abrir o modal com as informações detalhadas do cliente
//   const handleOpenModal = (cliente) => {
//     setClienteDetalhado(cliente);
//     setModalOpen(true);
//   };

//   // Função para fechar o modal
//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   // Formata os dados para o gráfico
//   const formatarDadosGrafico = (dados) => {
//     return Object.keys(dados).map((cpf) => ({
//       name: `Cliente ${cpf}`,
//       value: dados[cpf],
//     }));
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Notas Fiscais
//       </Typography>
//       <TextField
//         fullWidth
//         label="Pesquisar por nome do cliente"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{ mb: 3 }}
//       />

//       {/* Lista de clientes */}
//       <List>
//         {filteredClientes.map((cliente) => (
//           <React.Fragment key={cliente.cpf}>
//             <ListItem
//               button
//               onClick={() => handleClienteClick(cliente.cpf)}
//               sx={{
//                 backgroundColor: clienteSelecionado === cliente.cpf ? "#e0e0e0" : "inherit",
//                 borderRadius: "5px",
//                 mb: 1,
//               }}
//             >
//               <ListItemText primary={cliente.nome} />
//               {clienteSelecionado === cliente.cpf ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>

//             {/* Tabela de notas do cliente */}
//             <Collapse in={clienteSelecionado === cliente.cpf} timeout="auto" unmountOnExit>
//               <TableContainer component={Paper} sx={{ mb: 3 }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Data</TableCell>
//                       <TableCell>Pet</TableCell>
//                       <TableCell>Valor Total</TableCell>
//                       <TableCell>Ações</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {notasDoCliente.map((nota) => (
//                       <TableRow key={nota.id}>
//                         <TableCell>
//                           {nota.banhoDates && nota.banhoDates.length > 0 ? formatarData(new Date(nota.banhoDates[0])) : "Data inválida"}
//                         </TableCell>
//                         <TableCell>{nota.pet}</TableCell>
//                         <TableCell>{nota.totalValue}</TableCell>
//                         <TableCell>
//                           <IconButton onClick={() => handleOpenModal(cliente)}>
//                             <ArrowForward />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Collapse>
//           </React.Fragment>
//         ))}
//       </List>

//       {/* Modal para exibir informações detalhadas do cliente */}
//       <Modal
//         open={modalOpen}
//         onClose={handleCloseModal}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 4,
//         }}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Detalhes do Cliente
//           </Typography>
//           {clienteDetalhado && (
//             <Box>
//               <Typography>Nome: {clienteDetalhado.nome}</Typography>
//               <Typography>CPF: {clienteDetalhado.cpf}</Typography>
//               <Typography>Notas Fiscais:</Typography>
//               <List>
//                 {clienteDetalhado.notas.map((nota) => (
//                   <ListItem key={nota.id}>
//                     <ListItemText
//                       primary={`Pet: ${nota.pet}`}
//                       secondary={
//                         <>
//                           <Typography>Valor: {nota.totalValue}</Typography>
//                           <Typography>Datas dos Banhos:</Typography>
//                           <List>
//                             {nota.banhoDates.map((date, index) => (
//                               <ListItem key={index}>
//                                 <ListItemText primary={formatarData(new Date(date))} />
//                               </ListItem>
//                             ))}
//                           </List>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           )}
//           <Button onClick={handleCloseModal}>Fechar</Button>
//         </Box>
//       </Modal>

//       {/* Gráficos de notas por mês */}
//       <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
//         Gráficos de Notas Fiscais por Mês
//       </Typography>
//       <Grid container spacing={3}>
//         {Object.keys(notasPorMes).map((mes) => (
//           <Grid item xs={12} md={6} lg={4} key={mes}>
//             <Paper sx={{ padding: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Mês: {mes}
//               </Typography>
//               <DonutChart data={formatarDadosGrafico(notasPorMes[mes])} />
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default NotasFiscais;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Collapse,
  IconButton,
  Modal,
  Button,
  Grid,
} from "@mui/material";
import { ExpandMore, ExpandLess, ArrowForward } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import useStore from "../store";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Função para formatar a data
const formatarData = (data) => {
  if (!data || !(data instanceof Date) || isNaN(data)) {
    return "Data inválida";
  }

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
};

// Componente DonutChart
const DonutChart = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

const NotasFiscais = () => {
  const [clientesComNotas, setClientesComNotas] = useState([]);
  const [notasDoCliente, setNotasDoCliente] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [clienteDetalhado, setClienteDetalhado] = useState(null);
  const [notasPorMes, setNotasPorMes] = useState({});

  // Busca as notas fiscais e agrupa por cliente
  useEffect(() => {
    const fetchNotas = async () => {
      const querySnapshot = await getDocs(collection(db, 'notas'));
      const notasData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Agrupa as notas por cliente
      const clientesAgrupados = notasData.reduce((acc, nota) => {
        if (!acc[nota.cpf]) {
          acc[nota.cpf] = {
            nome: nota.clientName,
            cpf: nota.cpf,
            notas: [],
          };
        }
        acc[nota.cpf].notas.push(nota);
        return acc;
      }, {});

      setClientesComNotas(Object.values(clientesAgrupados));

      // Agrupa os banhos por mês e cliente
      const banhosAgrupadosPorMes = notasData.reduce((acc, nota) => {
        nota.banhoDates.forEach((date) => {
          const dataBanho = new Date(date);
          const mes = `${dataBanho.getFullYear()}-${dataBanho.getMonth() + 1}`;

          if (!acc[mes]) {
            acc[mes] = {};
          }

          if (!acc[mes][nota.cpf]) {
            acc[mes][nota.cpf] = 0;
          }

          acc[mes][nota.cpf] += 1;
        });

        return acc;
      }, {});

      setNotasPorMes(banhosAgrupadosPorMes);
    };

    fetchNotas();
  }, []);

  // Filtra os clientes com base no termo de pesquisa
  const filteredClientes = clientesComNotas.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para exibir/ocultar as notas de um cliente
  const handleClienteClick = (cpf) => {
    if (clienteSelecionado === cpf) {
      setClienteSelecionado(null); // Fecha a tabela se o mesmo cliente for clicado novamente
      setNotasDoCliente([]);
    } else {
      const cliente = clientesComNotas.find((c) => c.cpf === cpf);
      setClienteSelecionado(cpf);
      setNotasDoCliente(cliente.notas);
    }
  };

  // Função para abrir o modal com as informações detalhadas do cliente
  const handleOpenModal = (cliente) => {
    setClienteDetalhado(cliente);
    setModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Formata os dados para o gráfico
  const formatarDadosGrafico = (dados) => {
    return Object.keys(dados).map((cpf) => ({
      name: `Cliente ${cpf}`,
      value: dados[cpf],
    }));
  };

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

      {/* Lista de clientes */}
      <List>
        {filteredClientes.map((cliente) => (
          <React.Fragment key={cliente.cpf}>
            <ListItem
              button
              onClick={() => handleClienteClick(cliente.cpf)}
              sx={{
                backgroundColor: clienteSelecionado === cliente.cpf ? "#e0e0e0" : "inherit",
                borderRadius: "5px",
                mb: 1,
              }}
            >
              <ListItemText primary={cliente.nome} />
              {clienteSelecionado === cliente.cpf ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            {/* Tabela de notas do cliente */}
            <Collapse in={clienteSelecionado === cliente.cpf} timeout="auto" unmountOnExit>
              <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Pet</TableCell>
                      <TableCell>Valor Total</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notasDoCliente.map((nota) => (
                      <TableRow key={nota.id}>
                        <TableCell>
                          {nota.banhoDates && nota.banhoDates.length > 0 ? formatarData(new Date(nota.banhoDates[0])) : "Data inválida"}
                        </TableCell>
                        <TableCell>{nota.pet}</TableCell>
                        <TableCell>{nota.totalValue}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleOpenModal(cliente)}>
                            <ArrowForward />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </React.Fragment>
        ))}
      </List>

      {/* Modal para exibir informações detalhadas do cliente */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detalhes do Cliente
          </Typography>
          {clienteDetalhado && (
            <Box>
              <Typography>Nome: {clienteDetalhado.nome}</Typography>
              <Typography>CPF: {clienteDetalhado.cpf}</Typography>
              <Typography>Notas Fiscais:</Typography>
              <List>
                {clienteDetalhado.notas.map((nota) => (
                  <ListItem key={nota.id}>
                    <ListItemText
                      primary={`Pet: ${nota.pet}`}
                      secondary={
                        <>
                          <Typography>Valor: {nota.totalValue}</Typography>
                          <Typography>Datas dos Banhos:</Typography>
                          <List>
                            {nota.banhoDates.map((date, index) => (
                              <ListItem key={index}>
                                <ListItemText primary={formatarData(new Date(date))} />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          <Button onClick={handleCloseModal}>Fechar</Button>
        </Box>
      </Modal>

      {/* Gráficos de notas por mês */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Gráficos de Banhos por Mês
      </Typography>
      <Grid container spacing={3}>
        {Object.keys(notasPorMes).map((mes) => (
          <Grid item xs={12} md={6} lg={4} key={mes}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Mês: {mes}
              </Typography>
              <DonutChart data={formatarDadosGrafico(notasPorMes[mes])} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NotasFiscais;