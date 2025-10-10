
export const commands = [

  { comando: "info", descripcion: "Muestra esta tabla de comandos", parametros: "" },
  { comando: "lista", descripcion: "Muestra todos los libros en la base de datos", parametros: "" },

  { comando: "agregarLibro", descripcion: "Agrega un libro nuevo (argumentos: titulo autor anio isbn)", parametros: ["titulo", "autor", "anio", "isbn"] },
  

  { comando: "buscarLibro", descripcion: "Busca un libro por el título (o palabra clave)", parametros: ["titulo"] },
  { comando: "buscarPorId", descripcion: "Busca un libro por su ID único de MongoDB", parametros: ["id"] },
  

  { comando: "actualizarLibro", descripcion: "Actualiza autor/año de un libro (argumentos: titulo nuevoAutor nuevoAnio)", parametros: ["titulo", "nuevoAutor", "nuevoAnio"] },

  { comando: "borrarLibro", descripcion: "Borra un libro mediante ISBN", parametros: ["isbn"] },
];