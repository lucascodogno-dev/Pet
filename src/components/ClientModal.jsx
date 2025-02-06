import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ClientPDF from "./ClientPDF";
import useStore from "../store";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "80%", md: "60%" },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const formatCurrency = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// const ClientModal = ({ client, onClose }) => {
//   const products = useStore((state) => state.products);
//   const fetchProducts = useStore((state) => state.fetchProducts);

//   const pacotes = useStore((state) => state.pacotes);
//   const fetchPacotes = useStore((state) => state.fetchPacotes);

//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [selectedPackage, setSelectedPackage] = useState("");

//   const [temporaryProducts, setTemporaryProducts] = useState([]);
//   const [temporaryPackages, setTemporaryPackages] = useState([]);

//   const [additionalValue, setAdditionalValue] = useState("");

//   useEffect(() => {
//     if (client) {
//       fetchProducts();
//       fetchPacotes();
//     }
//   }, [client, fetchProducts, fetchPacotes]);

//   const handleAddProduct = () => {
//     if (selectedProduct) {
//       setTemporaryProducts([...temporaryProducts, selectedProduct]);
//       setSelectedProduct("");
//     }
//   };

//   const handleAddPackage = () => {
//     if (selectedPackage) {
//       setTemporaryPackages([...temporaryPackages, selectedPackage]);
//       setSelectedPackage("");
//     }
//   };

//   const handleValueChange = (e) => {
//     let rawValue = e.target.value.replace(/\D/g, "");
//     let formattedValue = (parseFloat(rawValue) / 100).toFixed(2);
//     setAdditionalValue(formattedValue);
//   };

//   return (
//     <Modal open={!!client} onClose={onClose}>
//       <Paper sx={modalStyle}>
//         <Typography variant="h5" gutterBottom>
//           {client.name}
//         </Typography>
//         <Typography variant="body1">CPF/CNPJ: {client.cpfCnpj}</Typography>
//         <Typography variant="body1">Telefone: {client.phone}</Typography>

//         <TextField
//           fullWidth
//           label="Valor Adicional"
//           type="text"
//           value={formatCurrency(additionalValue)}
//           onChange={handleValueChange}
//           margin="normal"
//           sx={{ mt: 2 }}
//         />

//         {(temporaryProducts.length > 0 || temporaryPackages.length > 0) && (
//           <>
//             {/* <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
//               Itens na Nota:
//             </Typography> */}
//             <div>
//               {temporaryProducts.map((product, index) => (
//                 // <ListItem key={index}>
//                 //   <ListItemText
//                 //     primary={product.name || 'Produto sem nome'}
//                 //     secondary={formatCurrency(product.price || 0)}
//                 //   />
//                 // </ListItem>
//                 <TextField
//                   fullWidth
//                   key={index}
//                   label={product.name || "Produto sem nome"}
//                   type="text"
//                   value={formatCurrency(product.price || 0)}
//                   // onChange={handleValueChange}
//                   margin="normal"
//                   sx={{ mt: 2 }}
//                 />

//                 // <div key={index}>
//                 //   <h5>Pacote: {product.name || 'Produto sem nome'}</h5>
//                 //   <h5>Valor: {formatCurrency(product.price || 0)}</h5>
//                 // </div>
//               ))}
//               <Divider/>
//               {temporaryPackages.map((pack, index) => (
//                 <TextField
//                   fullWidth
//                   key={index}
//                   label={pack.nomePacote || "Pacote sem nome"}
//                   type="text"
//                   value={formatCurrency(pack.preco || 0)}
//                   //  onChange={handleValueChange}
//                   margin="normal"
//                   sx={{ mt: 2 }}
//                 />

//                 // <ListItem key={index}>
//                 //   <ListItemText
//                 //     primary={pack.nomePacote || 'Pacote sem nome'}
//                 //     secondary={formatCurrency(pack.preco || 0)}
//                 //   />
//                 // </ListItem>
//               ))}
//             </div>
//           </>
//         )}

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6" gutterBottom>
//               Adicionar Produto:
//             </Typography>
//             <Select
//               fullWidth
//               value={selectedProduct}
//               onChange={(e) => setSelectedProduct(e.target.value)}
//               displayEmpty
//             >
//               <MenuItem value="" disabled>
//                 Selecione um produto
//               </MenuItem>
//               {products.map((product) => (
//                 <MenuItem key={product.id} value={product}>
//                   {product.name} - {formatCurrency(product.price)}
//                 </MenuItem>
//               ))}
//             </Select>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleAddProduct}
//               disabled={!selectedProduct}
//               sx={{ mt: 2, width: "100%" }}
//             >
//               Adicionar Produto
//             </Button>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6" gutterBottom>
//               Adicionar Pacote:
//             </Typography>
//             <Select
//               fullWidth
//               value={selectedPackage}
//               onChange={(e) => setSelectedPackage(e.target.value)}
//               displayEmpty
//             >
//               <MenuItem value="" disabled>
//                 Selecione um pacote
//               </MenuItem>
//               {pacotes.map((pack) => (
//                 <MenuItem key={pack.id} value={pack}>
//                   {pack.nomePacote} - {formatCurrency(pack.preco)}
//                 </MenuItem>
//               ))}
//             </Select>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleAddPackage}
//               disabled={!selectedPackage}
//               sx={{ mt: 2, width: "100%" }}
//             >
//               Adicionar Pacote
//             </Button>
//           </Grid>
//         </Grid>

//         <Box
//           sx={{
//             mt: 3,
//             display: "flex",
//             justifyContent: "space-between",
//             gap: 2,
//           }}
//         >
//           <PDFDownloadLink
//             document={
//               <ClientPDF
//                 client={client}
//                 products={temporaryProducts}
//                 packages={temporaryPackages}
//                 additionalValue={parseFloat(additionalValue) || 0}
//               />
//             }
//             fileName={`${client.name}.pdf`}
//           >
//             {({ loading }) => (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 disabled={loading}
//                 fullWidth
//               >
//                 {loading ? "Carregando PDF..." : "Baixar PDF"}
//               </Button>
//             )}
//           </PDFDownloadLink>
//           <Button onClick={onClose} variant="outlined" fullWidth>
//             Fechar
//           </Button>
//         </Box>
//       </Paper>
//     </Modal>
//   );
// };

// export default ClientModal;
const ClientModal = ({ client, onClose }) => {
  const products = useStore((state) => state.products);
  const fetchProducts = useStore((state) => state.fetchProducts);

  const pacotes = useStore((state) => state.pacotes);
  const fetchPacotes = useStore((state) => state.fetchPacotes);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  const [temporaryProducts, setTemporaryProducts] = useState([]);
  const [temporaryPackages, setTemporaryPackages] = useState([]);

  const [additionalValue, setAdditionalValue] = useState("");
  const [banhoDates, setBanhoDates] = useState([]); // Novo estado para datas dos banhos

  useEffect(() => {
    if (client) {
      fetchProducts();
      fetchPacotes();
    }
  }, [client, fetchProducts, fetchPacotes]);

  const handleAddProduct = () => {
    if (selectedProduct) {
      setTemporaryProducts([...temporaryProducts, selectedProduct]);
      setSelectedProduct("");
    }
  };

  const handleAddPackage = () => {
    if (selectedPackage) {
      setTemporaryPackages([...temporaryPackages, selectedPackage]);
      setSelectedPackage("");
      scheduleBanhos(selectedPackage.numBanhos);
    }
  };

  const scheduleBanhos = (numBanhos) => {
    const dates = [];
    let currentDate = new Date();

    for (let i = 0; i < numBanhos; i++) {
      if (currentDate.getDay() === 0) { // Se for domingo, muda para segunda-feira
        currentDate.setDate(currentDate.getDate() + 1);
      }
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7); // Adiciona 7 dias para o próximo banho
    }

    setBanhoDates(dates);
  };

  const handleValueChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");
    let formattedValue = (parseFloat(rawValue) / 100).toFixed(2);
    setAdditionalValue(formattedValue);
  };

  return (
    <Modal open={!!client} onClose={onClose}>
      <Paper sx={modalStyle}>
        <Typography variant="h5" gutterBottom>
          {client.name}
        </Typography>
        <Typography variant="body1">CPF/CNPJ: {client.cpfCnpj}</Typography>
        <Typography variant="body1">Telefone: {client.phone}</Typography>

        <TextField
          fullWidth
          label="Valor Adicional"
          type="text"
          value={formatCurrency(additionalValue)}
          onChange={handleValueChange}
          margin="normal"
          sx={{ mt: 2 }}
        />

        {(temporaryProducts.length > 0 || temporaryPackages.length > 0) && (
          <>
            <div>
              {temporaryProducts.map((product, index) => (
                <TextField
                  fullWidth
                  key={index}
                  label={product.name || "Produto sem nome"}
                  type="text"
                  value={formatCurrency(product.price || 0)}
                  margin="normal"
                  sx={{ mt: 2 }}
                />
              ))}
              <Divider/>
              {temporaryPackages.map((pack, index) => (
                <TextField
                  fullWidth
                  key={index}
                  label={pack.nomePacote || "Pacote sem nome"}
                  type="text"
                  value={formatCurrency(pack.preco || 0)}
                  margin="normal"
                  sx={{ mt: 2 }}
                />
              ))}
            </div>
          </>
        )}

        {banhoDates.length > 0 && (
          <div>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Datas dos Banhos:
            </Typography>
            {banhoDates.map((date, index) => (
              <Typography key={index} variant="body1">
                Banho {index + 1}: {date.toLocaleDateString()}
              </Typography>
            ))}
          </div>
        )}

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Adicionar Produto:
            </Typography>
            <Select
              fullWidth
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecione um produto
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product}>
                  {product.name} - {formatCurrency(product.price)}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              disabled={!selectedProduct}
              sx={{ mt: 2, width: "100%" }}
            >
              Adicionar Produto
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Adicionar Pacote:
            </Typography>
            <Select
              fullWidth
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecione um pacote
              </MenuItem>
              {pacotes.map((pack) => (
                <MenuItem key={pack.id} value={pack}>
                  {pack.nomePacote} - {formatCurrency(pack.preco)} - {pack.numBanhos} banhos
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddPackage}
              disabled={!selectedPackage}
              sx={{ mt: 2, width: "100%" }}
            >
              Adicionar Pacote
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <PDFDownloadLink
            document={
              <ClientPDF
                client={client}
                products={temporaryProducts}
                packages={temporaryPackages}
                additionalValue={parseFloat(additionalValue) || 0}
                banhoDates={banhoDates}
              />
            }
            fileName={`${client.name}.pdf`}
          >
            {({ loading }) => (
              <Button
                variant="contained"
                color="secondary"
                disabled={loading}
                fullWidth
              >
                {loading ? "Carregando PDF..." : "Baixar PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <Button onClick={onClose} variant="outlined" fullWidth>
            Fechar
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ClientModal;