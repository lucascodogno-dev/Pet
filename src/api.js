// src/api.js
const clients = [];
const products = [];

export const getClients = () => clients;
export const addClient = (client) => clients.push(client);
export const getProducts = () => products;
export const addProduct = (product) => products.push(product);