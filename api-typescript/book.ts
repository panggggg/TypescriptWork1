import * as mongoose from 'mongoose';

export const bookSchema = new mongoose.Schema({
    title: { type: String, require: true },
    author: { type: String, require: true }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;