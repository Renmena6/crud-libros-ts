
import { BookModel } from "./models/bookModel";


const checkModel = () => {
    // 1. Verificamos si el modelo está disponible
    if (BookModel) {

        console.log(" Modelo 'BookModel' cargado correctamente.");
        console.log(`Colección de MongoDB: ${BookModel.collection.name}`); 
    } else {
        console.log(" ERROR: El modelo no se importó. Revisa 'bookModel.ts'.");
    }
};

checkModel(); 