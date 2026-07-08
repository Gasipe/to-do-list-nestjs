import { Module } from '@nestjs/common';
import { TodoController } from './todo/controller/controller.todo';
import { TodoService } from './todo/service/service.todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './todo/entity/todo.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'Teste_123',
      database: 'mydatabase',
      entities: [ToDo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ToDo]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
