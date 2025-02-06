import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClientForm from './components/ClientForm';
import ProductForm from './components/ProductForm';
import ClientList from './components/ClientList';
import PacoteForm from './components/PacoteForm';
import useStore from './store';

const App = () => {
  const addPacote = useStore((state) => state.addPacote);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ClientForm />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/products" element={<ProductForm />} />
        <Route path="/pacotes" element={<PacoteForm onSave={addPacote} />} />
        <Route path="*" element={<ClientForm />} />
      </Routes>
    </Router>
  );
};

export default App;
