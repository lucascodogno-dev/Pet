// // // src/components/ClientList.jsx
// // import React, { useState, useEffect } from "react";
// // import { ListItemButton } from "@mui/material";
// // import {
// //   TextField,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Container,
// //   Typography,
// //   Paper,
// // } from "@mui/material";
// // import useStore from "../store";
// // import ClientModal from "./ClientModal";

// // const ClientList = () => {
// //   const clients = useStore((state) => state.clients);
// //   const fetchClients = useStore((state) => state.fetchClients);
// //   const [search, setSearch] = useState("");
// //   const [selectedClient, setSelectedClient] = useState(null);

// //   // Carrega os clientes ao montar o componente
// //   useEffect(() => {
// //     fetchClients();
// //   }, [fetchClients]);

// //   // Função para normalizar strings (remover espaços e converter para minúsculas)
// //   const normalizeString = (str) =>
// //     str ? str.replace(/\s+/g, "").toLowerCase() : "";

// //   // Filtra os clientes com base no nome ou CPF/CNPJ
// //   const filteredClients = clients
// //     ? clients.filter((client) => {
// //         const normalizedSearch = normalizeString(search);
// //         const nameMatch =
// //           client.name &&
// //           normalizeString(client.name).includes(normalizedSearch);
// //         const cpfCnpjMatch =
// //           client.cpfCnpj &&
// //           normalizeString(client.cpfCnpj).includes(normalizedSearch);
// //         return nameMatch || cpfCnpjMatch;
// //       })
// //     : [];

// //   // Depuração: exibe os clientes carregados e o termo de pesquisa
// //   useEffect(() => {
// //     console.log("Clientes carregados:", clients);
// //   }, [clients]);

// //   useEffect(() => {
// //     console.log("Termo de pesquisa:", search);
// //   }, [search]);

// //   return (
// //     <Container maxWidth="md">
// //       <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
// //         <Typography variant="h4" gutterBottom>
// //           Lista de Clientes
// //         </Typography>

// //         {/* Campo de pesquisa */}
// //         <TextField
// //           fullWidth
// //           label="Pesquisar"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           margin="normal"
// //         />
// // {filteredClients <= 0 ? "não possui clientes" : "possui cliente"}
// //         {/* Lista de clientes filtrados */}
// //         <List>
// //           {filteredClients.map((client) => (
// //             // <ListItem
// //             //   key={client.id}
// //             //   button
// //             //   onClick={() => setSelectedClient(client)}
// //             //   style={{ border: "solid 1px black", borderRadius: "20px", marginBottom: "10px" }}
// //             // >
// //             //   <ListItemText primary={client.name} secondary={`CPF/CNPJ: ${client.cpfCnpj}`} />
// //             // </ListItem>
// //             <ListItem
// //               key={client.id}
// //               style={{
// //                 border: "solid 1px black",
// //                 borderRadius: "20px",
// //                 marginBottom: "10px",
// //               }}
// //             >
// //               <ListItemButton onClick={() => setSelectedClient(client)}>
// //                 <ListItemText
// //                   primary={client.name}
// //                   secondary={`CPF/CNPJ: ${client.cpfCnpj}`}
// //                 />
// //               </ListItemButton>
// //             </ListItem>
// //           ))}
// //         </List>
      
// //         {/* Modal para exibir detalhes do cliente selecionado */}
// //         {selectedClient && (
// //           <ClientModal
// //             client={selectedClient}
// //             onClose={() => setSelectedClient(null)}
// //           />
// //         )}
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default ClientList;
// // src/components/ClientList.jsx
// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   Container,
//   Typography,
//   Paper,
//   CircularProgress,
//   ListItemButton,
//   Box,
// } from "@mui/material";
// import useStore from "../store";
// import ClientModal from "./ClientModal";

// const ClientList = () => {
//   const clients = useStore((state) => state.clients);
//   const fetchClients = useStore((state) => state.fetchClients);
//   const [search, setSearch] = useState("");
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Carrega os clientes ao montar o componente
//   useEffect(() => {
//     const loadClients = async () => {
//       setLoading(true);
//       try {
//         await fetchClients();
//       } catch (error) {
//         console.error("Erro ao buscar clientes:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadClients();
//   }, [fetchClients]);

//   // Função para normalizar strings (remover espaços e converter para minúsculas)
//   const normalizeString = (str) =>
//     str ? str.replace(/\s+/g, "").toLowerCase() : "";

//   // Filtra os clientes com base no nome ou CPF/CNPJ
//   const filteredClients = clients
//     ? clients.filter((client) => {
//         const normalizedSearch = normalizeString(search);
//         const nameMatch =
//           client.name &&
//           normalizeString(client.name).includes(normalizedSearch);
//         const cpfCnpjMatch =
//           client.cpfCnpj &&
//           normalizeString(client.cpfCnpj).includes(normalizedSearch);
//         return nameMatch || cpfCnpjMatch;
//       })
//     : [];

//   return (
//     <Container maxWidth="md">
//       <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
//         <Typography variant="h4" gutterBottom>
//           Lista de Clientes
//         </Typography>

//         {/* Campo de pesquisa */}
//         <TextField
//           fullWidth
//           label="Pesquisar"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           margin="normal"
//         />

//         {/* Exibe o loading enquanto os dados são carregados */}
//         {loading ? (
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             mt={4}
//           >
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             {/* Lista de clientes filtrados */}
//             {filteredClients.length > 0 ? (
//               <List>
//                 {filteredClients.map((client) => (
//                   <ListItem
//                     key={client.id}
//                     style={{
//                       border: "solid 1px black",
//                       borderRadius: "20px",
//                       marginBottom: "10px",
//                     }}
//                   >
//                     <ListItemButton onClick={() => setSelectedClient(client)}>
//                       <ListItemText
//                         primary={client.name}
//                         secondary={`CPF/CNPJ: ${client.cpfCnpj}`}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </List>
//             ) : (
//               // Mensagem quando não há clientes
//               <Typography variant="body1" align="center" mt={4}>
//                 Nenhum cliente encontrado.
//               </Typography>
//             )}
//           </>
//         )}

//         {/* Modal para exibir detalhes do cliente selecionado */}
//         {selectedClient && (
//           <ClientModal
//             client={selectedClient}
//             onClose={() => setSelectedClient(null)}
//           />
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default ClientList;
import React, { useState, useEffect } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Paper,
  CircularProgress,
  ListItemButton,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import useStore from "../store";
import ClientModal from "./ClientModal";



const ClientList = () => {
  const clients = useStore((state) => state.clients);
  const fetchClients = useStore((state) => state.fetchClients);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = createTheme({
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: 'h2',
            h2: 'h2',
            h3: 'h2',
            h4: 'h2',
            h5: 'h2',
            h6: 'h2',
            subtitle1: 'h2',
            subtitle2: 'h2',
            body1: 'span',
            body2: 'span',
          },
        },
      },
    },
  });
  

  useEffect(() => {
    const loadClients = async () => {
      setLoading(true);
      try {
        await fetchClients();
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, [fetchClients]);

  const normalizeString = (str) =>
    str ? str.replace(/\s+/g, "").toLowerCase() : "";

  const filteredClients = clients
    ? clients.filter((client) => {
        const normalizedSearch = normalizeString(search);
        return (
          normalizeString(client.name).includes(normalizedSearch) ||
          normalizeString(client.cpfCnpj).includes(normalizedSearch)
        );
      })
    : [];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Lista de Clientes
        </Typography>

        <TextField
          fullWidth
          label="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
        />

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {filteredClients.length > 0 ? (
              <List>
                {filteredClients.map((client) => (
                  <ListItem
                    key={client.id}
                    style={{
                      border: "solid 1px black",
                      borderRadius: "20px",
                      marginBottom: "10px",
                    }}
                  >
                    <ListItemButton onClick={() => setSelectedClient(client)}>
                    <ListItemText
  primary={`${client.name}`}
  secondary={
    <ThemeProvider theme={theme}>
      <Typography component="div" variant="body2">CPF/CNPJ: {client.cpfCnpj}</Typography>
      <Typography component="div" variant="body2">Pet: {client.petName}</Typography>
      <Typography component="div" variant="body2">Raça: {client.breed}</Typography>
      <Typography component="div" variant="body2">Telefone: {client.phone}</Typography>
    </ThemeProvider>
  }
/>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" align="center" mt={4}>
                Nenhum cliente encontrado.
              </Typography>
            )}
          </>
        )}

        {selectedClient && (
          <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        )}
      </Paper>
    </Container>
  );
};

export default ClientList;
