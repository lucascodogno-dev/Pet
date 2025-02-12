
// // import { create } from 'zustand';
// // import { db } from '../src/firebase'; // Ajuste conforme seu projeto

// // import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
// // const useStore = create((set) => ({
// //   clients: [],
// //   pacotes: [], // Adicione esta linha para inicializar pacotes
// //   products: [],
// // //   // Buscar clientes do Firebase
// //    fetchClients: async () => {
// //      const querySnapshot = await getDocs(collection(db, 'clients'));
// //      const clients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// //      set({ clients });
// //    },

// // //   // Buscar produtos do Firebase
// //    fetchProducts: async () => {
// //      const querySnapshot = await getDocs(collection(db, 'products'));
// //      const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// //      set({ products });
// //    },
// //   fetchPacotes: async () => {
// //     try {
// //       const querySnapshot = await getDocs(collection(db, 'pacotes'));
// //       const pacotes = querySnapshot.docs.map((doc) => ({
// //         id: doc.id,
// //         ...doc.data()
// //       }));
// //       set({ pacotes });
// //     } catch (error) {
// //       console.error('Erro ao buscar pacotes:', error);
// //     }
// //   },

// //   addPacote: async (pacote) => {
// //     try {
// //       const docRef = await addDoc(collection(db, 'pacotes'), pacote);
// //       set((state) => ({
// //         pacotes: [...state.pacotes, { id: docRef.id, ...pacote }]
// //       }));
// //     } catch (error) {
// //       console.error('Erro ao adicionar pacote:', error);
// //     }
// //   },

// //   updatePacote: async (id, updatedPacote) => {
// //     try {
// //       const pacoteRef = doc(db, 'pacotes', id);
// //       await updateDoc(pacoteRef, updatedPacote);
// //       set((state) => ({
// //         pacotes: state.pacotes.map((pacote) =>
// //           pacote.id === id ? { id, ...updatedPacote } : pacote
// //         ),
// //       }));
// //     } catch (error) {
// //       console.error('Erro ao atualizar pacote:', error);
// //     }
// //   },

// //   deletePacote: async (id) => {
// //     try {
// //       await deleteDoc(doc(db, 'pacotes', id));
// //       set((state) => ({
// //         pacotes: state.pacotes.filter((pacote) => pacote.id !== id),
// //       }));
// //     } catch (error) {
// //       console.error('Erro ao excluir pacote:', error);
// //     }
// //   },
// // }));
// // export default useStore;

// import { create } from 'zustand';
// import { db } from '../src/firebase';
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// const useStore = create((set) => ({
//   clients: [],
//   pacotes: [],
//   products: [],

//   fetchClients: async () => {
//     const querySnapshot = await getDocs(collection(db, 'clients'));
//     const clients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     set({ clients });
//   },

//   fetchProducts: async () => {
//     const querySnapshot = await getDocs(collection(db, 'products'));
//     const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     set({ products });
//   },

//   fetchPacotes: async () => {
//     const querySnapshot = await getDocs(collection(db, 'pacotes'));
//     const pacotes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     set({ pacotes });
//   },

//   addPacote: async (pacote) => {
//     const docRef = await addDoc(collection(db, 'pacotes'), pacote);
//     set((state) => ({
//       pacotes: [...state.pacotes, { id: docRef.id, ...pacote }]
//     }));
//   },

//   addProduct: async (product) => {
//     const docRef = await addDoc(collection(db, 'products'), product);
//     set((state) => ({
//       products: [...state.products, { id: docRef.id, ...product }],
//     }));
//   },
//   updateProduct: async (id, updatedProduct) => {
//     await updateDoc(doc(db, 'products', id), updatedProduct);
//     set((state) => ({
//       products: state.products.map((product) =>
//         product.id === id ? { id, ...updatedProduct } : product
//       ),
//     }));
//   },

//   deleteProduct: async (id) => {
//     await deleteDoc(doc(db, 'products', id));
//     set((state) => ({
//       products: state.products.filter((product) => product.id !== id),
//     }));
//   },
//   updatePacote: async (id, updatedPacote) => {
//     await updateDoc(doc(db, 'pacotes', id), updatedPacote);
//     set((state) => ({
//       pacotes: state.pacotes.map((pacote) => pacote.id === id ? { id, ...updatedPacote } : pacote),
//     }));
//   },

//   deletePacote: async (id) => {
//     await deleteDoc(doc(db, 'pacotes', id));
//     set((state) => ({
//       pacotes: state.pacotes.filter((pacote) => pacote.id !== id),
//     }));
//   },
// }));

// export default useStore;

import { create } from 'zustand';
import { db } from '../src/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const useStore = create((set) => ({
  clients: [],
  pacotes: [],
  products: [],

  // Busca clientes do Firestore
  fetchClients: async () => {
    const querySnapshot = await getDocs(collection(db, 'clients'));
    const clients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    set({ clients });
  },

  // Adiciona um novo cliente ao Firestore e ao estado local
  addClient: async (client) => {
    const docRef = await addDoc(collection(db, 'clients'), client);
    set((state) => ({
      clients: [...state.clients, { id: docRef.id, ...client }],
    }));
  },

  // Funções existentes para pacotes e produtos
  fetchPacotes: async () => {
    const querySnapshot = await getDocs(collection(db, 'pacotes'));
    const pacotes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    set({ pacotes });
  },

  addPacote: async (pacote) => {
    const docRef = await addDoc(collection(db, 'pacotes'), pacote);
    set((state) => ({
      pacotes: [...state.pacotes, { id: docRef.id, ...pacote }],
    }));
  },

  updatePacote: async (id, updatedPacote) => {
    await updateDoc(doc(db, 'pacotes', id), updatedPacote);
    set((state) => ({
      pacotes: state.pacotes.map((pacote) =>
        pacote.id === id ? { id, ...updatedPacote } : pacote
      ),
    }));
  },

  deletePacote: async (id) => {
    await deleteDoc(doc(db, 'pacotes', id));
    set((state) => ({
      pacotes: state.pacotes.filter((pacote) => pacote.id !== id),
    }));
  },

  fetchProducts: async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    set({ products });
  },

  addProduct: async (product) => {
    const docRef = await addDoc(collection(db, 'products'), product);
    set((state) => ({
      products: [...state.products, { id: docRef.id, ...product }],
    }));
  },

  updateProduct: async (id, updatedProduct) => {
    await updateDoc(doc(db, 'products', id), updatedProduct);
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { id, ...updatedProduct } : product
      ),
    }));
  },

  deleteProduct: async (id) => {
    await deleteDoc(doc(db, 'products', id));
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }));
  },
  fetchNotas: async () => {
    const querySnapshot = await getDocs(collection(db, 'notas'));
    const notas = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    set({ notas });
  },

  saveNotaFiscal: async (cpf, notaData) => {
    try {
      // Adiciona a nota fiscal na coleção 'notas' com o CPF como referência
      const docRef = await addDoc(collection(db, 'notas'), {
        cpf,
        ...notaData,
      });
      console.log('Nota fiscal salva com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao salvar nota fiscal:', error);
    }
  },
}));

export default useStore;