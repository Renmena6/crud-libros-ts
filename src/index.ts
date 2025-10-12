
import { connectDB } from "./db/connections"; 
import { main as controllerMain } from "./controllers/controller"; 
import mongoose from "mongoose";                   

async function init() {
  
  const argumentos = process.argv;

  const accion = argumentos[2]; 

  if (!accion) {
    console.log("❌ Error: Debes ingresar un comando. Usa 'npm start -- info' para ver la lista.");
    return;
  }


  if (accion === 'info') {

    const argsUtiles = argumentos.slice(2); 
    await controllerMain(argsUtiles, accion);
    console.log("✅ Aplicación terminada.");
    return;
  }  

  try {
    await connectDB();
    

    const argsUtiles = argumentos.slice(2);
    await controllerMain(argsUtiles, accion);

  } catch (error) {
    console.error("❌ ERROR CRÍTICO en la aplicación (Conexión o Ejecución):", error);
  } finally {

    await mongoose.disconnect();
    console.log("✅ Aplicación terminada. Conexión a DB cerrada.");
  }
}

init();