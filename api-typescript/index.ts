import express from 'express';
import * as bookController from './src/controllers/bookController';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import isCached from './middleware/cache';

const app = express();

mongoose.connect('mongodb://localhost:27017/mytypescript', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log("***Connected to MongoDB***");
});

app.use(bodyParser.json());

app.get('/books', bookController.allBooks);
app.get('/book/:id', isCached, bookController.getBook);
app.post('/book', bookController.addBook);
app.delete('/book/:id', bookController.deleteBook);
app.put('/book/:id', bookController.updateBook);

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})