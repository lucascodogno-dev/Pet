

// // import React from "react";
// // import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// // const styles = StyleSheet.create({
// //   page: {
// //     flexDirection: "column",
// //     padding: 20,
// //   },
// //   section: {
// //     margin: 10,
// //     padding: 10,
// //     flexGrow: 1,
// //   },
// //   title: {
// //     fontSize: 24,
// //     textAlign: "center",
// //     marginBottom: 20,
// //   },
// //   text: {
// //     fontSize: 12,
// //     marginBottom: 10,
// //   },
// //   header: {
// //     fontSize: 16,
// //     marginBottom: 10,
// //     fontWeight: "bold",
// //   },
// // });


// // const ClientPDF = ({ client, products, packages, additionalValue, banhoDates }) => {
  
// //    const totalProducts = products.reduce((sum, product) => {
// //      const price = parseFloat(product.price) || 0;
// //      return sum + price;
// //    }, 0);

// //    const totalPackages = packages.reduce((sum, pack) => {
// //      const preco = parseFloat(pack.preco) || 0;
// //      return sum + preco;
// //    }, 0);

// //    const total = totalProducts + totalPackages + (parseFloat(additionalValue) || 0);

// //   return (
// //     <Document>
// //       <Page size="A4" style={styles.page}>
// //         <View style={styles.section}>
// //           <Text style={styles.title}>Nota Fiscal</Text>
// //           <Text style={styles.header}>Cliente:</Text>
// //           <Text style={styles.text}>Nome: {client.name}</Text>
// //           <Text style={styles.text}>CPF/CNPJ: {client.cpfCnpj}</Text>
// //           <Text style={styles.text}>Telefone: {client.phone}</Text>
// //           <Text style={styles.text}>Pet: {client.petName}</Text>
// //           <Text style={styles.text}>Raça: {client.breed}</Text>

// //           <Text style={styles.header}>Produtos:</Text>
// //           {products.map((product, index) => (
// //             <Text key={index} style={styles.text}>
// //               {product.name} - {new Intl.NumberFormat("pt-BR", {
// //                 style: "currency",
// //                 currency: "BRL",
// //               }).format(product.price || 0)}
// //             </Text>
// //           ))}

// //           <Text style={styles.header}>Pacotes:</Text>
// //           {packages.map((pack, index) => (
// //             <Text key={index} style={styles.text}>
// //               {pack.nomePacote} - {new Intl.NumberFormat("pt-BR", {
// //                 style: "currency",
// //                 currency: "BRL",
// //               }).format(pack.preco || 0)}
// //             </Text>
// //           ))}

// //           <Text style={styles.header}>Valor Adicional:</Text>
// //           <Text style={styles.text}>
// //             {new Intl.NumberFormat("pt-BR", {
// //               style: "currency",
// //               currency: "BRL",
// //             }).format(additionalValue || 0)}
// //           </Text>

// //           <Text style={styles.header}>Datas dos Banhos:</Text>
// //           {banhoDates.map((date, index) => (
// //             <Text key={index} style={styles.text}>
// //               {date.toLocaleDateString()}
// //             </Text>
// //           ))}
// //           <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
// //         </View>
// //       </Page>
// //     </Document>
// //   );
// // };

// // export default ClientPDF;
// import React from "react";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     padding: 40,
//     fontFamily: "Helvetica",
//   },
//   section: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     textAlign: "center",
//     marginBottom: 30,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   header: {
//     fontSize: 16,
//     marginBottom: 10,
//     fontWeight: "bold",
//     color: "#555",
//     borderBottom: "1px solid #ccc",
//     paddingBottom: 5,
//   },
//   text: {
//     fontSize: 12,
//     marginBottom: 8,
//     color: "#666",
//   },
//   total: {
//     fontSize: 14,
//     marginTop: 20,
//     fontWeight: "bold",
//     textAlign: "right",
//     color: "#000",
//   },
//   banhoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   banhoDate: {
//     fontSize: 12,
//     color: "#666",
//   },
//   banhoValue: {
//     fontSize: 12,
//     textAlign: "right",
//     color: "#666",
//   },
//   date: {
//     fontSize: 12,
//     textAlign: "right",
//     marginBottom: 20,
//     color: "#666",
//   },
//   divider: {
//     borderBottom: "1px solid #ccc",
//     marginVertical: 10,
//   },
// });

// const ClientPDF = ({ client, products, packages, additionalValue, banhoDates }) => {
//   const totalProducts = products.reduce((sum, product) => {
//     const price = parseFloat(product.price) || 0;
//     return sum + price;
//   }, 0);

//   const totalPackages = packages.reduce((sum, pack) => {
//     const preco = parseFloat(pack.preco) || 0;
//     return sum + preco;
//   }, 0);

//   const total = totalProducts + totalPackages + (parseFloat(additionalValue) || 0);

//   const packagesWithValuePerBanho = packages.map(pack => {
//     const preco = parseFloat(pack.preco) || 0;
//     const banhosCount = banhoDates.length;
//     const valuePerBanho = banhosCount > 0 ? preco / banhosCount : 0;
//     return {
//       ...pack,
//       valuePerBanho,
//     };
//   });

//   const currentDate = new Date().toLocaleDateString("pt-BR");

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text style={styles.date}>Data de emissão: {currentDate}</Text>
//         <Text style={styles.title}>Nota Fiscal</Text>

//         <View style={styles.section}>
//           <Text style={styles.header}>Cliente:</Text>
//           <Text style={styles.text}>Nome: {client.name}</Text>
//           <Text style={styles.text}>CPF/CNPJ: {client.cpfCnpj}</Text>
//           <Text style={styles.text}>Telefone: {client.phone}</Text>
//           <Text style={styles.text}>Pet: {client.petName}</Text>
//           <Text style={styles.text}>Raça: {client.breed}</Text>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.section}>
//   <Text style={styles.header}>Produtos:</Text>
//   {products.length > 0 ? (
//     products.map((product, index) => (
//       <Text key={index} style={styles.text}>
//         {product.name} -{" "}
//         {new Intl.NumberFormat("pt-BR", {
//           style: "currency",
//           currency: "BRL",
//         }).format(product.price || 0)}
//       </Text>
//     ))
//   ) : (
//     <Text style={styles.text}>Sem produtos adicionados na nota</Text>
//   )}
// </View>

//         <View style={styles.divider} />

//         <View style={styles.section}>
//           <Text style={styles.header}>Pacotes:</Text>
//           {packagesWithValuePerBanho.map((pack, index) => (
//             <Text key={index} style={styles.text}>
//               {pack.nomePacote} - {new Intl.NumberFormat("pt-BR", {
//                 style: "currency",
//                 currency: "BRL",
//               }).format(pack.preco || 0)} (Valor por banho: {new Intl.NumberFormat("pt-BR", {
//                 style: "currency",
//                 currency: "BRL",
//               }).format(pack.valuePerBanho || 0)})
//             </Text>
//           ))}
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.section}>
//           <Text style={styles.header}>Valor Adicional:</Text>
//           <Text style={styles.text}>
//             {new Intl.NumberFormat("pt-BR", {
//               style: "currency",
//               currency: "BRL",
//             }).format(additionalValue || 0)}
//           </Text>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.section}>
//           <Text style={styles.header}>Datas dos Banhos:</Text>
//           {banhoDates.map((date, index) => (
//             <View key={index} style={styles.banhoRow}>
//               <Text style={styles.banhoDate}>
//                 {date.toLocaleDateString()}
//               </Text>
//               <Text style={styles.banhoValue}>
//                 {new Intl.NumberFormat("pt-BR", {
//                   style: "currency",
//                   currency: "BRL",
//                 }).format(packagesWithValuePerBanho[0]?.valuePerBanho || 0)}
//               </Text>
//             </View>
//           ))}
//         </View>

//         <View style={styles.divider} />

//         <Text style={styles.total}>
//           Total: {new Intl.NumberFormat("pt-BR", {
//             style: "currency",
//             currency: "BRL",
//           }).format(total)}
//         </Text>
//       </Page>
//     </Document>
//   );
// };

// export default ClientPDF;
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
    color: "#333",
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#555",
    borderBottom: "1px solid #ccc",
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: "#666",
  },
  total: {
    fontSize: 14,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "right",
    color: "#000",
  },
  banhoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  banhoDate: {
    fontSize: 12,
    color: "#666",
  },
  banhoValue: {
    fontSize: 12,
    textAlign: "right",
    color: "#666",
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    marginBottom: 20,
    color: "#666",
  },
  divider: {
    borderBottom: "1px solid #ccc",
    marginVertical: 10,
  },
});

const ClientPDF = ({ client, products, packages, additionalValue, banhoDates }) => {
  const totalProducts = products.reduce((sum, product) => {
    const price = parseFloat(product.price) || 0;
    return sum + price;
  }, 0);

  const totalPackages = packages.reduce((sum, pack) => {
    const preco = parseFloat(pack.preco) || 0;
    return sum + preco;
  }, 0);

  const total = totalProducts + totalPackages + (parseFloat(additionalValue) || 0);

  const packagesWithValuePerBanho = packages.map(pack => {
    const preco = parseFloat(pack.preco) || 0;
    const banhosCount = banhoDates.length;
    const valuePerBanho = banhosCount > 0 ? preco / banhosCount : 0;
    return {
      ...pack,
      valuePerBanho,
    };
  });

  const currentDate = new Date().toLocaleDateString("pt-BR");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.date}>Data de emissão: {currentDate}</Text>
        <Text style={styles.title}>Nota Fiscal</Text>

        <View style={styles.section}>
          <Text style={styles.header}>Cliente:</Text>
          <Text style={styles.text}>Nome: {client.name}</Text>
          <Text style={styles.text}>CPF/CNPJ: {client.cpfCnpj}</Text>
          <Text style={styles.text}>Telefone: {client.phone}</Text>
          <Text style={styles.text}>Pet: {client.petName}</Text>
          <Text style={styles.text}>Raça: {client.breed}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.header}>Produtos:</Text>
          {products.length > 0 ? (
            products.map((product, index) => (
              <Text key={index} style={styles.text}>
                {product.name} -{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price || 0)}
              </Text>
            ))
          ) : (
            <Text style={styles.text}>Sem produtos adicionados na nota</Text>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.header}>Pacotes:</Text>
          {packagesWithValuePerBanho.map((pack, index) => (
            <Text key={index} style={styles.text}>
              {pack.nomePacote} - {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pack.preco || 0)} (Valor por banho: {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pack.valuePerBanho || 0)})
            </Text>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.header}>Valor Adicional:</Text>
          <Text style={styles.text}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(additionalValue || 0)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.header}>Datas dos Banhos:</Text>
          {banhoDates.map((date, index) => (
            <View key={index} style={styles.banhoRow}>
              <Text style={styles.banhoDate}>
                {new Date(date).toLocaleDateString("pt-BR")}
              </Text>
              <Text style={styles.banhoValue}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(packagesWithValuePerBanho[0]?.valuePerBanho || 0)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.total}>
          Total: {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </Text>
      </Page>
    </Document>
  );
};

export default ClientPDF;