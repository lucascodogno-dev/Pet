// // src/components/Navbar.jsx
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

// const Navbar = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);

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

//       <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
//         <List>
//           <ListItem
//             button
//             component={Link}
//             to="/"
//             onClick={() => setDrawerOpen(false)}
//           >
//             <ListItemText primary="Cadastro/Clientes" />
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/clients"
//               onClick={() => setDrawerOpen(false)}
//             >
//               <ListItemText primary="Clientes" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             button
//             component={Link}
//             to="/products"
//             onClick={() => setDrawerOpen(false)}
//           >
//             <ListItemText primary="Cadastro/Produtos" />
//           </ListItem>
//           <ListItem
//             button
//             component={Link}
//             to="/pacotes"
//             onClick={() => setDrawerOpen(false)}
//           >
//             <ListItemText primary="Cadastro/pacote" />
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

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Estilos comuns para os itens da lista
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
            <ListItemText primary="Clientes" />
          </ListItem>
          <ListItem disablePadding sx={listItemStyles}>
            <ListItemButton
              component={Link}
              to="/clients"
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary="Clientes" />
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={listItemStyles}
            button
            component={Link}
            to="/products"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary="Produtos" />
          </ListItem>
          <ListItem
            sx={listItemStyles}
            button
            component={Link}
            to="/pacotes"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary="Pacotes" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;