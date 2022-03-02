import mongoose from 'mongoose';

export const startConnection = async() => {
    const typescriptAppDb = "mongodb://localhost/typescript-app";

    // connect ----> for connect to the db('protocol://localDB/dbName), {configurations}
   await mongoose.connect(typescriptAppDb);
    console.log(`Database is connected in: ${typescriptAppDb}`);
}

