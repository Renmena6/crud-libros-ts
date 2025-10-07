// src/index.ts (¡Punto de prueba funcional!)
import { connectDB } from "./db/connections";
import mongoose from "mongoose";

async function initTest() {
    console.log("⏳ Iniciando prueba de conexión...");

    
    await connectDB();
    

    
    console.log("prueba de conexion.");
}

initTest();