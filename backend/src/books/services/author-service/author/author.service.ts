import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/books/Models/author.entity';
import { IAuthor } from 'src/books/Models/author.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService { 

	constructor(@InjectRepository(AuthorEntity) private authorRepository: Repository<AuthorEntity>) { }

	async getAllAuthors() {
		// if (!check) {
		// 	return await this.authorRepository.createQueryBuilder('authors')
		// 	.select(['first_name', 'last_name'])
		// 	.distinct(true)
		// 	.getRawMany();
		// }
		return await this.authorRepository.find()
		
	}

	async saveAuthor(author: IAuthor) {
		return await this.authorRepository.save(author)
	}

	async getAuthorById(id: number) {
		return await this.authorRepository.findOne(id)
	}

	async getAuthorByName(author: IAuthor) {
		const find_auth = await this.authorRepository.findOne(
			{ where: { first_name: author.first_name, last_name: author.last_name } })
		return find_auth
	}

	async updateAuthor(author: IAuthor) {
		return await this.authorRepository.update(author.id, author)
	}

	async destroyAuthor(id: number) {
		await this.authorRepository.delete(id)
	}

	async destroyAllAuthors(authors: IAuthor[]) {
		for (const author of authors)
			await this.authorRepository.delete(author.id)
	}
}
