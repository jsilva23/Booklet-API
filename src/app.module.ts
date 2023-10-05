import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthorsModule } from './authors/authors.module';
import { AdminsModule } from './admins/admins.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'booklet',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthorsModule,
    AdminsModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
