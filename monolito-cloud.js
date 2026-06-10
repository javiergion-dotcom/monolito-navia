import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  deleteDoc
}
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/* ================= FIREBASE MONOLITO ================= */

const firebaseConfig = {
  apiKey: "PEGA_AQUI_TU_API_KEY_REAL",
  authDomain: "monolito-ed87d.firebaseapp.com",
  projectId: "monolito-ed87d",
  storageBucket: "monolito-ed87d.appspot.com",
  messagingSenderId: "737849584362",
  appId: "1:737849584362:web:3d1821bedcd64080cf8593",
  measurementId: "G-7XCZ0VN7ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= FUNCIONES COMUNES ================= */

export async function leerColeccion(nombreColeccion){

  try{

    const querySnapshot =
      await getDocs(collection(db, nombreColeccion));

    const lista = [];

    querySnapshot.forEach((documento)=>{

      lista.push({
        id: documento.id,
        ...documento.data()
      });

    });

    return lista;

  }catch(error){

    console.error("Error leyendo colección:", nombreColeccion, error);

    const local =
      localStorage.getItem(nombreColeccion);

    if(local){
      try{
        return JSON.parse(local);
      }catch(e){
        return [];
      }
    }

    return [];
  }
}

export async function guardarColeccion(nombreColeccion, datos){

  try{

    if(!Array.isArray(datos)){
      throw new Error("Los datos deben ser una lista");
    }

    for(const item of datos){

      const id =
        item.id ||
        String(Date.now()) + "_" + Math.random().toString(36).slice(2);

      const limpio = {
        ...item,
        id:id,
        actualizado:new Date().toISOString()
      };

      await setDoc(
        doc(db, nombreColeccion, id),
        limpio
      );
    }

    localStorage.setItem(
      nombreColeccion,
      JSON.stringify(datos)
    );

    return true;

  }catch(error){

    console.error("Error guardando colección:", nombreColeccion, error);

    localStorage.setItem(
      nombreColeccion,
      JSON.stringify(datos)
    );

    return false;
  }
}

export function escucharColeccion(nombreColeccion, callback){

  try{

    return onSnapshot(
      collection(db, nombreColeccion),

      (snapshot)=>{

        const lista = [];

        snapshot.forEach((documento)=>{

          lista.push({
            id: documento.id,
            ...documento.data()
          });

        });

        localStorage.setItem(
          nombreColeccion,
          JSON.stringify(lista)
        );

        callback(lista);
      },

      (error)=>{

        console.error("Error escuchando colección:", nombreColeccion, error);

        const local =
          localStorage.getItem(nombreColeccion);

        if(local){
          try{
            callback(JSON.parse(local));
          }catch(e){
            callback([]);
          }
        }else{
          callback([]);
        }
      }
    );

  }catch(error){

    console.error("No se pudo iniciar escucha:", nombreColeccion, error);

    callback([]);
    return function(){};
  }
}

export async function borrarDocumento(nombreColeccion, id){

  try{

    await deleteDoc(
      doc(db, nombreColeccion, id)
    );

    return true;

  }catch(error){

    console.error("Error borrando documento:", nombreColeccion, id, error);
    return false;
  }
}
