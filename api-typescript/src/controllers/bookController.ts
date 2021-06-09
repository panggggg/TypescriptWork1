import { Request, Response } from 'express';
import Book from './../../book';

// - GET - /books => all books
export let allBooks = (req: Request, res: Response) => {
    let books = Book.find((err: any, books: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send(books);
        }
    })
}

// - GET - /book/{1} => a book with id 1
export let getBook = async (req: Request, res: Response) => {
    Book.findById(req.params.id, (err: any, book: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send(book);
        }
    })
}

// - POST - /book => insert a new book into the database
export let addBook = async (req: Request, res: Response) => {
    let book = new Book(req.body);

    book.save((err: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send(book);
            console.log("insert a new book")
            console.log(req.body)
        }
    })
}

// - DELETE - /book/{1} => delete a book with id of 1
export let deleteBook = async (req: Request, res: Response) => {
    Book.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send("Successfully deleted the book.");
        }
    })
}

// - PUT - /book/{1} => update a book with id of 1
export let updateBook = async (req: Request, res: Response) => {
    Book.findByIdAndUpdate(req.params.id, req.body, (err: any) => {
        if (err) {
            res.send(err)
        } else {
            res.send("Successfully updated book.");
        }
    })
}
