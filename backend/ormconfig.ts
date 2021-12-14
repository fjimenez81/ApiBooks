import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
    type: "postgres",
    host: "database",
    port: 5432,
    username: "admin_book_store",
    password: "1234abcd.",
    database: "book_store",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
}