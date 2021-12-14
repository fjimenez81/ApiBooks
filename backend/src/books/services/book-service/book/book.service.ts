import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/Models/book.entity';
import { IBook } from 'src/books/Models/book.interface';
import { Repository } from 'typeorm';

@Injectable()
export class BookService { 

	constructor(@InjectRepository(BookEntity) private bookRepository: Repository<BookEntity>) { }

	async getAllbooks() {
		return await this.bookRepository.find({relations: ['author']})
	}

	async saveBook(book: IBook) {
		return await this.bookRepository.save(book)
	}

	async getBookById(id: number) {
		return await this.bookRepository.findOne(id , { relations: ['author'] })
	}

	async getBookByName(name: string) {
		const book = await this.bookRepository.findOne(
			{ where: { name } })
		return book
	}

	async updateBook(book: IBook) {
		return await this.bookRepository.save(book)
	}

	async destroyBook(id: number) {
		return await this.bookRepository.delete(id)
	}

	async destroyAllBooks(books: IBook[]) {
		for (const book of books) {
			await this.bookRepository.delete(book.id)
		}
	}
}
