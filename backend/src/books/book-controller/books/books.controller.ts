import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express'
import { IAuthor } from 'src/books/Models/author.interface';
import { IBook } from 'src/books/Models/book.interface';
import { AuthorService } from 'src/books/services/author-service/author/author.service';
import { BookService } from 'src/books/services/book-service/book/book.service';
import { readFile } from 'fs/promises'

@Controller('')
export class BooksController {

	constructor(private bookService: BookService,
				private authorService: AuthorService) { this.initDb() }

	private async initDb() {
		const books: IBook[] = await this.bookService.getAllbooks()
		if (!books.length) {
			const lst_books = JSON.parse(await readFile('./books.json', 'utf-8'))
			for (const book of lst_books)
				await this.bookService.saveBook(book)
		}
	}

	@Get('books') //- Returns a list of books in the database in JSON format
	async getAllBooks() {
		const books: IBook[] = await this.bookService.getAllbooks()
		return books
	}

	@Get('book/:id') //- Returns a detail view of the specified book id. Nest author details in JSON format
	async getBookById(@Param('id') id: number) {
		const book: IBook = await this.bookService.getBookById(id)
		return book
	}

	@Get('authors') //- Returns a list of authors in the database in JSON format
	async getAllAuthors() {
		const authors: IAuthor[] = await this.authorService.getAllAuthors()
        return authors
	}

	@Get('author/:id') //- Returns a detail view of the specified author id
	async getAuthorById(@Param('id') id: number) {
		const author: IAuthor = await this.authorService.getAuthorById(id)
        return author
	}

	@Post('book') // Creates a new book with the specified details - Expects a JSON body
	async saveBook(@Res() res: Response, @Body() book: IBook) {
		const new_book: IBook = await this.bookService.getBookByName(book.name)
		if (new_book)
			return res.send({message: `The book titled ${book.name} exists!`})
		const book_saved: IBook = await this.bookService.saveBook(book)
		return res.status(201).send({message: `The book ${book_saved.name} is saved`})
	}

	@Post('author') //Creates a new author with the specified details - Expects a JSON body
	async saveAuthor(@Res() res: Response, @Body() author: IAuthor) {
		const new_author: IAuthor = await this.authorService.getAuthorByName(author)
		if (new_author)
			return res.send(
				{message: `The author named ${author.first_name + " " + author.last_name} exists`
			})
		await this.authorService.saveAuthor(author)
		return res.send({
			message: `The author named ${author.first_name + " " + author.last_name} created`
		})
	}

	@Put('book/:id') //Update book
	async updateBook(@Res() res: Response, @Param('id') id: number, @Body() book: IBook) {
		let book_up: IBook = await this.bookService.getBookById(id)
		book_up = {...book_up, name: book.name, isbn: book.isbn, author: {
			first_name: book.author.first_name,
			last_name: book.author.last_name
		}}
		await this.bookService.updateBook(book_up)
		return res.send({message: `The book ${book.name} is updated`})
	}

	@Put('author/:id') //Update author
	async updateAuthor(@Res() res: Response, @Param('id') id: number, @Body() author: IAuthor) {
		const new_author: IAuthor = await this.authorService.getAuthorById(id)
		if (new_author) {
			new_author.first_name = author.first_name
			new_author.last_name = author.last_name
			await this.authorService.updateAuthor(new_author)
			return res.send({message: `The ${author.first_name} with id: ${id} is updated`})
		}
	}
	
	@Delete('book/:id') //Delete book
	async destroyBook(@Res() res: Response, @Param('id') id: number) {
		await this.bookService.destroyBook(id)
		return res.send({message: `Destroy book: ${id}`})
	}

	@Delete('author/:id') //Delete book
	async destroyAuthor(@Res() res: Response, @Param('id') id: number) {
		await this.authorService.destroyAuthor(id)
		return res.send({message: `Destroy author: ${id}`})
	}

	@Delete('books') //Delete All books
	async destroyAllBooks(@Res() res: Response) {
		const books: IBook[] = await this.bookService.getAllbooks()
		await this.bookService.destroyAllBooks(books)
		return res.send({message: `Destroy all books!`})
	}

	@Delete('authors') //Delete All books
	async destroyAllAuthors(@Res() res: Response) {
		const authors: IAuthor[] = await this.authorService.getAllAuthors()
		await this.authorService.destroyAllAuthors(authors)
		return res.send({message: `Destroy all authors!`})
	}
}
