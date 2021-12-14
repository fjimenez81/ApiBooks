import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "./book.entity";

@Entity('authors')
export class AuthorEntity {
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	// @OneToMany(() => BookEntity, book => book.author)
    // books: BookEntity[];
}