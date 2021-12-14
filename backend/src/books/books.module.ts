import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './book-controller/books/books.controller';
import { AuthorEntity } from './Models/author.entity';
import { BookEntity } from './Models/book.entity';
import { BookService } from './services/book-service/book/book.service';
import { AuthorService } from './services/author-service/author/author.service';


@Module({
	imports: [TypeOrmModule.forFeature([AuthorEntity, BookEntity])],
	controllers: [BooksController],
	providers: [BookService, AuthorService]
})
export class BooksModule { }
