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
// } from "@mui/material";
// import { ExpandMore, ExpandLess } from "@mui/icons-material";
// import useStore from "../store";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// // Função para formatar a data
// const formatarData = (data) => {
 
//   if (!data || !(data instanceof Date) || isNaN(data)) {
//     return "Data inválida"; // Ou retorne um valor padrão, como "N/A"
//   }

//   const dia = String(data.getDate()).padStart(2, "0");
//   const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
//   const ano = data.getFullYear();

//   return `${dia}/${mes}/${ano}`;
// };

// const NotasFiscais = () => {
//   const [clientesComNotas, setClientesComNotas] = useState([]);
//   const [notasDoCliente, setNotasDoCliente] = useState([]);
//   const [clienteSelecionado, setClienteSelecionado] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
  
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
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {notasDoCliente.map((nota) => (
//                       <TableRow key={nota.id}>
//                         <TableCell>
//                           {formatarData(new Date(nota.banhoDates[0]))} {/* Formata a data */}
//                         </TableCell>
//                         <TableCell>{nota.pet}</TableCell>
//                         <TableCell>{nota.totalValue}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Collapse>
//           </React.Fragment>
//         ))}
//       </List>
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
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
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

const NotasFiscais = () => {
  const [clientesComNotas, setClientesComNotas] = useState([]);
  const [notasDoCliente, setNotasDoCliente] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Busca as notas fiscais e agrupa por cliente
  useEffect(() => {
    const fetchNotas = async () => {
      const querySnapshot = await getDocs(collection(db, 'notas'));
      const notasData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(notasData);

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

      // Converte o objeto em uma array
      setClientesComNotas(Object.values(clientesAgrupados));
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NotasFiscais;