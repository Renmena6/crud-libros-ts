#  Proyecto CLI de Gestión de Libros (CRUD)

Este es un proyecto de Línea de Comandos (CLI) desarrollado en TypeScript y Node.js que implementa un sistema CRUD (Crear, Leer, Actualizar, Borrar) para gestionar una base de datos de libros, utilizando Mongoose como ORM para la interacción con MongoDB.

##  Cómo Empezar

### 1. Prerrequisitos

 tener instalado:

1.  Node.js LTS.
2.  MongoDB .
3.  Mongo Compass.

### 2. Configuración del Proyecto

1.  Instalar Dependencias: Abre la terminal en la carpeta raíz del proyecto y ejecuta:
    
    npm install
    

2.  Configurar Conexión a DB:
    Abre el archivo `src/db/connection.ts` y verifica que la URL de conexión a tu base de datos sea correcta.

    > Ejemplo: `mongodb://localhost:27017/tu-nombre-de-db`

### 3. Ejecución

Todos los comandos se ejecutan a través del script `npm start`, seguido de dos guiones (`--`) y el comando de la aplicación.

---

##  Comandos Disponibles (CRUD)

### 1. Listar Libros (`lista`)

Muestra todos los libros almacenados en la base de datos.

```bash
npm start -- lista | npm run dev -- lista