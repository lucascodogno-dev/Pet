// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div style={{ width: isOpen ? '250px' : '0', overflow: 'hidden', transition: 'width 0.5s' }}>
      <button onClick={onClose}>Close</button>
      <ul>
        <li><Link to="/clients">Clientes</Link></li>
        <li><Link to="/products">Produtos</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;