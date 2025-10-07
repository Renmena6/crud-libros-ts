
import mongoose, { Schema } from "mongoose";

export interface IBook {
    title: string;
    author: string;
    year: number;
    isbn: string;
}

    //ISBN significa International Standard Book Number
const BookSchema = new Schema<IBook>({
    title: { type: String, required: true },  
    author: { type: String, required: true }, 
    year: { type: Number, required: true },
    isbn: { type: String, required: true, unique: true } 
}, {
    versionKey: false, 
    timestamps: true 
});


export const BookModel = mongoose.model<IBook>("Book", BookSchema);