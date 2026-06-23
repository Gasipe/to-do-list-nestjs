import { Module } from '@nestjs/common';
import { TodoController } from './todo/controller/controller.todo';
import { TodoService } from './todo/service/service.todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './todo/entity/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Teste_123',
      database: 'teste',
      entities: [ToDo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ToDo]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
