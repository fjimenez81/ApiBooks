import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthorEntity } from "./author.entity";
import { IAuthor } from "./author.interface";

@Entity('books')
export class BookEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	isbn: string;

	@OneToOne(() => AuthorEntity, { cascade: true })
    @JoinColumn()
    author: AuthorEntity;
}
