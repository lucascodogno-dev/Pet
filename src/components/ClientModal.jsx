
// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   TextField,
//   Grid,
//   Paper,
//   Divider,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ClientPDF from "./ClientPDF";
// import useStore from "../store";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: "95%", sm: "80%", md: "60%" },
//   maxHeight: "90vh",
//   overflowY: "auto",
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
// };

// const formatCurrency = (value) => {
//   if (!value) return "";
//   return new Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//   }).format(value);
// };

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
//   const [banhoDates, setBanhoDates] = useState([]);
//   const [selectedBanhoDate, setSelectedBanhoDate] = useState("");
//   const saveNotaFiscal = useStore((state) => state.saveNotaFiscal);

//   const handleSaveNotaFiscal = async () => {
//     const notaData = {
//       clientName: client.name,
//       cpf: client.cpfCnpj,
//       pet: client.petName,
//       raça: client.breed || "não declarado",
//       products: temporaryProducts,
//       packages: temporaryPackages,
//       additionalValue: parseFloat(additionalValue) || 0,
//       banhoDates: banhoDates,
//       totalValue: calculateTotalValue(),
//     };

//     await saveNotaFiscal(client.cpfCnpj, notaData);
//     alert('Nota fiscal salva com sucesso!');
//   };

//   const calculateTotalValue = () => {
//     const productsTotal = temporaryProducts.reduce((sum, product) => sum + (product.price || 0), 0);
//     const packagesTotal = temporaryPackages.reduce((sum, pack) => sum + (pack.preco || 0), 0);
//     return productsTotal + packagesTotal + (parseFloat(additionalValue) || 0);
//   };

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
//       scheduleBanhos(selectedPackage.numBanhos);
//     }
//   };

//   const scheduleBanhos = (numBanhos) => {
//     const dates = [];
//     let currentDate = new Date();

//     for (let i = 0; i < numBanhos; i++) {
//       if (currentDate.getDay() === 0) {
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//       dates.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 7);
//     }

//     setBanhoDates(dates);
//   };

//   const handleBanhoDateChange = (e) => {
//     setSelectedBanhoDate(e.target.value);
//   };

//   const calculateBanhoValue = (pack) => {
//     if (!pack || !pack.preco || !pack.numBanhos) return 0;
//     return pack.preco / pack.numBanhos;
//   };

//   return (
//     <Modal open={!!client} onClose={onClose}>
//       <Paper sx={modalStyle}>
//         <Typography variant="h5" gutterBottom>
//           {client.name}
//         </Typography>
//         <Typography variant="body1">CPF/CNPJ: {client.cpfCnpj}</Typography>
//         <Typography variant="body1">Telefone: {client.phone}</Typography>
//         <Typography variant="body1">Pet: {client.petName}</Typography>
//         <Typography variant="body1">Raça: {client.breed}</Typography>

//         {(temporaryProducts.length > 0 || temporaryPackages.length > 0) && (
//           <Accordion sx={{ mt: 2 }}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">Detalhes do Pedido</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               {temporaryProducts.map((product, index) => (
//                 <TextField
//                   fullWidth
//                   key={index}
//                   label={`${product.name + '  -  Produto Escolhido'}` || "Produto sem nome"}
//                   type="text"
//                   value={formatCurrency(product.price || 0)}
//                   margin="normal"
//                   sx={{ mt: 2 }}
//                 />
//               ))}
//               <Divider sx={{ my: 2 }} />
//               {temporaryPackages.map((pack, index) => (
//                 <TextField
//                   fullWidth
//                   key={index}
//                   label={`${pack.nomePacote + "  -  Pacote Escolhido" }`|| "Pacote sem nome"}
//                   type="text"
//                   value={formatCurrency(pack.preco || 0)}
//                   margin="normal"
//                   sx={{ mt: 2 }}
//                 />
//               ))}
//             </AccordionDetails>
//           </Accordion>
//         )}

//         {banhoDates.length > 0 && (
//           <Accordion sx={{ mt: 2 }}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="h6">Datas dos Banhos</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Select
//                 fullWidth
//                 value={selectedBanhoDate}
//                 onChange={handleBanhoDateChange}
//                 displayEmpty
//               >
//                 <MenuItem value="" disabled>
//                   Selecione uma data de banho
//                 </MenuItem>
//                 {banhoDates.map((date, index) => (
//                   <MenuItem key={index} value={date.toLocaleDateString()}>
//                     {date.toLocaleDateString()} -{" "}
//                     {formatCurrency(
//                       calculateBanhoValue(
//                         temporaryPackages[temporaryPackages.length - 1]
//                       )
//                     )}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </AccordionDetails>
//           </Accordion>
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
//                   {pack.nomePacote} - {formatCurrency(pack.preco)} -{" "}
//                   {pack.numBanhos} banhos
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
//                 banhoDates={banhoDates}
               
//               />
//             }
//             fileName={`${client.name}.pdf`}
//           >
//             {({ loading }) => (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 disabled={loading}
//                 onClick={handleSaveNotaFiscal}
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
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Grid,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ClientPDF from "./ClientPDF";
import useStore from "../store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const [banhoDates, setBanhoDates] = useState([]);
  const [selectedBanhoDate, setSelectedBanhoDate] = useState("");
  const saveNotaFiscal = useStore((state) => state.saveNotaFiscal);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSaveNotaFiscal = async () => {
    const notaData = {
      clientName: client.name,
      cpf: client.cpfCnpj,
      pet: client.petName,
      raça: client.breed || "não declarado",
      products: temporaryProducts,
      packages: temporaryPackages,
      additionalValue: parseFloat(additionalValue) || 0,
      banhoDates: banhoDates,
      totalValue: calculateTotalValue(),
    };

    try {
      await saveNotaFiscal(client.cpfCnpj, notaData);
      setSnackbarMessage("Nota fiscal salva com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Erro ao salvar a nota fiscal.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const calculateTotalValue = () => {
    const productsTotal = temporaryProducts.reduce((sum, product) => sum + (product.price || 0), 0);
    const packagesTotal = temporaryPackages.reduce((sum, pack) => sum + (pack.preco || 0), 0);
    return productsTotal + packagesTotal + (parseFloat(additionalValue) || 0);
  };

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
      if (currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }

    setBanhoDates(dates);
  };

  const handleBanhoDateChange = (e) => {
    setSelectedBanhoDate(e.target.value);
  };

  const calculateBanhoValue = (pack) => {
    if (!pack || !pack.preco || !pack.numBanhos) return 0;
    return pack.preco / pack.numBanhos;
  };

  return (
    <Modal open={!!client} onClose={onClose}>
      <Paper sx={modalStyle}>
        <Typography variant="h5" gutterBottom>
          {client.name}
        </Typography>
        <Typography variant="body1">CPF/CNPJ: {client.cpfCnpj}</Typography>
        <Typography variant="body1">Telefone: {client.phone}</Typography>
        <Typography variant="body1">Pet: {client.petName}</Typography>
        <Typography variant="body1">Raça: {client.breed}</Typography>

        {(temporaryProducts.length > 0 || temporaryPackages.length > 0) && (
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Detalhes do Pedido</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {temporaryProducts.map((product, index) => (
                <TextField
                  fullWidth
                  key={index}
                  label={`${product.name + '  -  Produto Escolhido'}` || "Produto sem nome"}
                  type="text"
                  value={formatCurrency(product.price || 0)}
                  margin="normal"
                  sx={{ mt: 2 }}
                />
              ))}
              <Divider sx={{ my: 2 }} />
              {temporaryPackages.map((pack, index) => (
                <TextField
                  fullWidth
                  key={index}
                  label={`${pack.nomePacote + "  -  Pacote Escolhido" }`|| "Pacote sem nome"}
                  type="text"
                  value={formatCurrency(pack.preco || 0)}
                  margin="normal"
                  sx={{ mt: 2 }}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        )}

        {banhoDates.length > 0 && (
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Datas dos Banhos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Select
                fullWidth
                value={selectedBanhoDate}
                onChange={handleBanhoDateChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecione uma data de banho
                </MenuItem>
                {banhoDates.map((date, index) => (
                  <MenuItem key={index} value={date.toLocaleDateString()}>
                    {date.toLocaleDateString()} -{" "}
                    {formatCurrency(
                      calculateBanhoValue(
                        temporaryPackages[temporaryPackages.length - 1]
                      )
                    )}
                  </MenuItem>
                ))}
              </Select>
            </AccordionDetails>
          </Accordion>
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
                  {pack.nomePacote} - {formatCurrency(pack.preco)} -{" "}
                  {pack.numBanhos} banhos
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
                onClick={handleSaveNotaFiscal}
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

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Modal>
  );
};

export default ClientModal;