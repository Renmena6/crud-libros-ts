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
      // extrae los argumentos de la terminal. El primer argumento util esta en el índice [3]
      const title = argumentos[3];
      const author = argumentos[4];
      const year = parseInt(argumentos[5]!); //  agregue "!" por que me marcaba error, La IA me corrigio ese error
      const isbnInput = argumentos[6]; 

      // Validacion para asegurar que hay suficientes datos
      if (!title || !author || !year || !isbnInput) {
        console.log("❌ Error: Debes ingresar el titulo, autor, anio y ISBN. (Consulta 'info')");
        break;
      }
      
      try {
        // 1. Validar que el isbn es unico (para evitar repetidos)
        const existe = await BookModel.findOne({ isbn: isbnInput });
        if (existe) {
          console.log(`❌ El libro con ISBN ${isbnInput} ya existe.`);
          break;
        }

        //  crea un nuevo model y lo guarda en mongo
        const nuevoLibro = new BookModel({ title, author, year, isbn: isbnInput });
        await nuevoLibro.save(); 
        console.log("✅ Libro agregado con éxito:", nuevoLibro);
      } catch (error) {
        console.error("❌ Error al agregar el libro. Asegúrate de que el año sea un número.", error);
      }
      break;
      
    case "actualizarLibro": 
      const titleToUpdate = argumentos[3];
      const newAuthor = argumentos[4];
      const newYear = parseInt(argumentos[5]!); 

      if (!titleToUpdate || !newAuthor || !newYear) {
        console.log("❌ Error: Debes ingresar el título y los nuevos datos.");
        break;
      }


      const libroAActualizar = await BookModel.findOneAndUpdate(
        { title: titleToUpdate },
        { author: newAuthor, year: newYear },
        { new: true } 
      );

      console.log(libroAActualizar ? "✅ Libro actualizado:" : "❌ No se encentra el libro a actualizar", libroAActualizar);
      break;
      
    case "borrarLibro": 
      const isbnToDelete = argumentos[3];

      if (!isbnToDelete) {
        console.log("❌ Error: Debes ingresar un ISBN válido.");
        break;
      }

      // esto borra el primer documento que coincida con el isbn
      const libroBorrado = await BookModel.findOneAndDelete({ isbn: isbnToDelete });
      
      console.log(libroBorrado ? `✅ Libro con ISBN ${isbnToDelete} borrado con éxito.` : "❌ No se encontró el libro para borrar.");
      break;

    case "buscarLibro":
      const searchTitle = argumentos[3];

      if (!searchTitle) {
        console.log("❌ Error: Debes ingresar un título o una palabra clave.");
        break;
      }
      // busca usando RegExp, busca coincidencias parciales ( busca gabriel" y encuentra "Gabriel Garcia Marquez")
      const librosEncontrados = await BookModel.find({ title: new RegExp(searchTitle, 'i') });
      
      console.log(`✅ Se encontraron ${librosEncontrados.length} resultados:`, librosEncontrados);
      break;

    case "buscarPorId": // Buscar por ID interno de MongoDB
        const idLibro = argumentos[3];
        if (!idLibro) {
            console.log("❌ Error: Debes ingresar el ID de MongoDB del libro.");
            break;
        }

        // busca por el ID interno (_id) que genera Mongo
        const libroEncontradoPorId = await BookModel.findById(idLibro);
        console.log(libroEncontradoPorId ? "✅ Libro encontrado por ID:" : "❌ No se encontró el libro con ese ID.", libroEncontradoPorId);
        break;

    default:
      console.log("Comando invalido. Use 'npm start -- info' para ver la lista de comandos.");
      break;
  }
}

export { main }; 