// src/components/ClientList.jsx
import React, { useState, useEffect } from "react";
import { ListItemButton } from "@mui/material";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Container,
  Typography,
  Paper,
} from "@mui/material";
import useStore from "../store";
import ClientModal from "./ClientModal";

const ClientList = () => {
  const clients = useStore((state) => state.clients);
  const fetchClients = useStore((state) => state.fetchClients);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  // Carrega os clientes ao montar o componente
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // Função para normalizar strings (remover espaços e converter para minúsculas)
  const normalizeString = (str) =>
    str ? str.replace(/\s+/g, "").toLowerCase() : "";

  // Filtra os clientes com base no nome ou CPF/CNPJ
  const filteredClients = clients
    ? clients.filter((client) => {
        const normalizedSearch = normalizeString(search);
        const nameMatch =
          client.name &&
          normalizeString(client.name).includes(normalizedSearch);
        const cpfCnpjMatch =
          client.cpfCnpj &&
          normalizeString(client.cpfCnpj).includes(normalizedSearch);
        return nameMatch || cpfCnpjMatch;
      })
    : [];

  // Depuração: exibe os clientes carregados e o termo de pesquisa
  useEffect(() => {
    console.log("Clientes carregados:", clients);
  }, [clients]);

  useEffect(() => {
    console.log("Termo de pesquisa:", search);
  }, [search]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Lista de Clientes
        </Typography>

        {/* Campo de pesquisa */}
        <TextField
          fullWidth
          label="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
        />

        {/* Lista de clientes filtrados */}
        <List>
          {filteredClients.map((client) => (
            // <ListItem
            //   key={client.id}
            //   button
            //   onClick={() => setSelectedClient(client)}
            //   style={{ border: "solid 1px black", borderRadius: "20px", marginBottom: "10px" }}
            // >
            //   <ListItemText primary={client.name} secondary={`CPF/CNPJ: ${client.cpfCnpj}`} />
            // </ListItem>
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
                  primary={client.name}
                  secondary={`CPF/CNPJ: ${client.cpfCnpj}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      
        {/* Modal para exibir detalhes do cliente selecionado */}
        {selectedClient && (
          <ClientModal
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
      </Paper>
    </Container>
  );
};

export default ClientList;
