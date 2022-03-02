import { Schema, model, Document } from 'mongoose';

// import the schema and define the formate of the data to set in db
const schema = new Schema({
    name: String,                  // String in mayuscle is for the structure of mongoose
    lastname: String,
    mail: String,
    message: String,
    imagePath: String
});

// Documents represents a tipical mongoDB document 
// this interface hered the document structure
interface IMail extends Document {
    name: string;              // string in minuscle is for the structure of typescript
    lastname: string;
    mail: string;
    message: string;
    imagePath: string;
}

// ----> crete the collection (table in sql) in the db model('nameOfTheCollection', schemaOfTheData)
// ---> theModel<willComplyWithTheInterface>
export default model<IMail>('Mail', schema)