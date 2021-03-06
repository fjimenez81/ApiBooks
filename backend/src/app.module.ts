import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { config } from "../ormconfig";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forRoot(config), BooksModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
