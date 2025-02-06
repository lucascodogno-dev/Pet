// src/components/Navbar.jsx
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

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary="Cadastro/Clientes" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/clients"
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemText primary="Clientes" />
            </ListItemButton>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/products"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary="Cadastro/Produtos" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/pacotes"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary="Cadastro/pacote" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
