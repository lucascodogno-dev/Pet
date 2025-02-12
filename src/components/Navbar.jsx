
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemButton,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link } from "react-router-dom";
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// import LayersIcon from '@mui/icons-material/Layers';
// const Navbar = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Estilos comuns para os itens da lista
//   const listItemStyles = {
//     backgroundColor: "blue",
//     borderRadius: "10px",
//     margin: "5px",
//     color: "white",
//     "&:hover": {
//       backgroundColor: "darkblue",
//     },
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             color="inherit"
//             onClick={() => setDrawerOpen(true)}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         sx={{ width: 250 }}
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <List sx={{ width: 250, padding: "10px" }}>
//           <ListItem
//             sx={listItemStyles}
//             button
//             component={Link}
//             to="/"
//             onClick={() => setDrawerOpen(false)}
//           >
//           <GroupAddIcon style={{marginRight: "15px"}}/>  <ListItemText primary="Cadastro - Cliente" />
//           </ListItem>
//           <ListItem disablePadding sx={listItemStyles}>
//             <ListItemButton
//               component={Link}
//               to="/clients"
//               onClick={() => setDrawerOpen(false)}
//             >
//             <AccountBoxIcon style={{marginRight: "15px"}}/>  <ListItemText primary="Clientes" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             sx={listItemStyles}
//             button
//             component={Link}
//             to="/products"
//             onClick={() => setDrawerOpen(false)}
//           >
//           <ContentPasteIcon style={{marginRight: "15px"}}/>  <ListItemText primary="Produtos" />
//           </ListItem>
//           <ListItem
//             sx={listItemStyles}
//             button
//             component={Link}
//             to="/pacotes"
//             onClick={() => setDrawerOpen(false)}
//           >
//            <LayersIcon style={{marginRight: "15px"}}/> <ListItemText primary="Pacotes" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LayersIcon from '@mui/icons-material/Layers';
import ReceiptIcon from '@mui/icons-material/Receipt'; // Ícone para notas fiscais

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const listItemStyles = {
    backgroundColor: "blue",
    borderRadius: "10px",
    margin: "5px",
    color: "white",
    "&:hover": {
      backgroundColor: "darkblue",
    },
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{ width: 250 }}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: 250, padding: "10px" }}>
          <ListItem
            sx={listItemStyles}
            button
            component={Link}
            to="/"
            onClick={() => setDrawerOpen(false)}
          >
            <GroupAddIcon style={{ marginRight: "15px" }} /> <ListItemText primary="Cadastro - Cliente" />
          </ListItem>
          <ListItem disablePadding sx={listItemStyles}>
            <ListItemButton
              component={Link}
              to="/clients"
              onClick={() => setDrawerOpen(false)}
            >
              <AccountBoxIcon style={{ marginRight: "15px" }} /> <ListItemText primary="Clientes" />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={listItemStyles}
            button
            component={Link}
            to="/products"
            onClick={() => setDrawerOpen(false)}
          >
            <ContentPasteIcon style={{ marginRight: "15px" }} /> <ListItemText primary="Produtos" />
          </ListItem>
          <ListItem
            sx={listItemStyles}
            button
            component={Link}
            to="/pacotes"
            onClick={() => setDrawerOpen(false)}
          >
            <LayersIcon style={{ marginRight: "15px" }} /> <ListItemText primary="Pacotes" />
          </ListItem>
          <ListItem
            sx={listItemStyles}
            button
            component={Link}
            to="/notas"
            onClick={() => setDrawerOpen(false)}
          >
            <ReceiptIcon style={{ marginRight: "15px" }} /> <ListItemText primary="Notas Fiscais" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;