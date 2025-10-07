
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/libraryDB'

export async function connectDB() {
    try {
    // La línea que hace la conexin real
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Base de datos conectada a MongoDB');
} catch (error) {
    // si algo falla capturamos el error y se muestra :
    console.error('❌ Error de conexión a la base de datos:', error);
    process.exit(1); 
}
}