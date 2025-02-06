
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  productItem: {
    marginBottom: 5,
  },
  total: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

const ClientPDF = ({ client, products, packages, additionalValue }) => {
  // Calcula o total dos produtos
  const totalProducts = products.reduce((sum, product) => {
    const price = parseFloat(product.price) || 0;
    return sum + price;
  }, 0);

  // Calcula o total dos pacotes
  const totalPackages = packages.reduce((sum, pack) => {
    const preco = parseFloat(pack.preco) || 0;
    return sum + preco;
  }, 0);

  // Calcula o total geral (produtos + pacotes + valor adicional)
  const total = totalProducts + totalPackages + (parseFloat(additionalValue) || 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Nome: {client.name}</Text>
          <Text>CPF/CNPJ: {client.cpfCnpj}</Text>
          <Text>Telefone: {client.phone}</Text>

          {/* Exibe o valor adicional */}
          <Text style={{ marginTop: 10 }}>
            Valor Adicional: R$ {parseFloat(additionalValue).toFixed(2) || '0.00'}
          </Text>

          {/* Exibe a lista de produtos */}
          {products && products.length > 0 && (
            <>
              <Text style={{ marginTop: 10 }}>Produtos na Nota:</Text>
              {products.map((product, index) => (
                <View key={index} style={styles.productItem}>
                  <Text>Produto: {product.name || 'Produto sem nome'}</Text>
                  <Text>Valor: R$ {parseFloat(product.price).toFixed(2) || '0.00'}</Text>
                </View>
              ))}
            </>
          )}

          {/* Exibe a lista de pacotes */}
          {packages && packages.length > 0 && (
            <>
              <Text style={{ marginTop: 10 }}>Pacotes na Nota:</Text>
              {packages.map((pack, index) => (
                <View key={index} style={styles.productItem}>
                  <Text>Pacote: {pack.nomePacote || 'Pacote sem nome'}</Text>
                  <Text>Valor: R$ {parseFloat(pack.preco).toFixed(2) || '0.00'}</Text>
                </View>
              ))}
            </>
          )}

          {/* Exibe o total */}
          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ClientPDF;