
import { commands } from "../utils/commands";    
import { BookModel } from "../models/bookModel"; 
import mongoose from "mongoose";                 


const main = async (argumentos: string[], accion: string) => { 
  
  switch (accion) {
    case "info":
      console.log("---- Comandos válidos ----");
      console.table(commands);
      break;
      
      
    case "lista": 
      console.log("⏳ Buscando todos los libros...");
      const books = await BookModel.find({});
      console.log(`✅ Se encontraron ${books.length} libros:`);
      console.log(books);
      break;
      
    case "agregarLibro": 
      
      const title = argumentos[1];
      const author = argumentos[2];
      const year = parseInt(argumentos[3]!); 
      const isbnInput = argumentos[4]; 

    
      if (!title || !author || !year || !isbnInput) {
        console.log("❌ Error: Debes ingresar el titulo, autor, anio y ISBN. (Consulta 'info')");
        break;
      }
      
      try {
        // 
        const existe = await BookModel.findOne({ isbn: isbnInput });
        if (existe) {
          console.log(`❌ El libro con ISBN ${isbnInput} ya existe.`);
          break;
        }


        const nuevoLibro = new BookModel({ title, author, year, isbn: isbnInput });
        await nuevoLibro.save(); 
        console.log("✅ Libro agregado con éxito:", nuevoLibro);
      } catch (error) {
        console.error("❌ Error al agregar el libro. Asegúrate de que el año sea un número.", error);
      }
      break;
      
    case "actualizarLibro": 
      const titleToUpdate = argumentos[1]; 
      const newAuthor = argumentos[2];
      const newYear = parseInt(argumentos[3]!); 

      if (!titleToUpdate || !newAuthor || !newYear) {
        console.log("❌ Error: Debes ingresar el título y los nuevos datos.");
        break;
      }

      const libroAActualizar = await BookModel.findOneAndUpdate(
        { title: titleToUpdate },
        { author: newAuthor, year: newYear },
        { new: true } 
      );

      console.log(libroAActualizar ? "✅ Libro actualizado:" : "❌ No existe el libro a actualizar", libroAActualizar);
      break;
      
    case "borrarLibro":
      const isbnToDelete = argumentos[1]; 

      if (!isbnToDelete) {
        console.log("❌ Error: Debes ingresar un ISBN válido.");
        break;
      }

      const libroBorrado = await BookModel.findOneAndDelete({ isbn: isbnToDelete });
      
      console.log(libroBorrado ? `✅ Libro con ISBN ${isbnToDelete} borrado con éxito.` : "❌ No se encontró el libro para borrar.");
      break;

    case "buscarLibro": 
      const searchTitle = argumentos[1]; 

      if (!searchTitle) {
        console.log("❌ Error: Debes ingresar un título o una palabra clave.");
        break;
      }
      
      const librosEncontrados = await BookModel.find({ title: new RegExp(searchTitle, 'i') });
      
      console.log(`✅ Se encontraron ${librosEncontrados.length} resultados:`, librosEncontrados);
      break;

    case "buscarPorId": 
        const idLibro = argumentos[1]; 
        if (!idLibro) {
            console.log("❌ Error: Debes ingresar el ID de MongoDB del libro.");
            break;
        }

        const libroEncontradoPorId = await BookModel.findById(idLibro);
        console.log(libroEncontradoPorId ? "✅ Libro encontrado por ID:" : "❌ No se encontró el libro con ese ID.", libroEncontradoPorId);
        break;

    default:

      console.log("Comando invalido. Use 'npm start -- info' para ver la lista de comandos.");
      break;
  }
}

export { main };