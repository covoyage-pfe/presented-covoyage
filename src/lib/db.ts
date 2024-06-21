import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.${process.env.DB_API_KEY}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        await mongoose.connect(uri);
        console.log('Connexion to MongoDB successful at ' + uri);
    } catch (error) {
        console.error('Connexion to MongoDB fails : ', error);
    }
}

export { connectToDatabase };