import { IAuthor } from "./author.interface";

export interface IBook {
    id?: number,
    name: string,
    isbn: string,
    author?: IAuthor
}