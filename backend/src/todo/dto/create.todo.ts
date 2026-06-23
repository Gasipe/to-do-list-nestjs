import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTodo {
  @IsString({ message: 'O titulo deve ser uma string' })
  @IsNotEmpty({ message: 'O titulo é obrigatório' })
  @MaxLength(250, {
    message: 'A descrição deve conter no máximo 250 caracteres',
  })
  title!: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @IsOptional()
  @MaxLength(600, {
    message: 'A descrição deve conter no máximo 600 caracteres',
  })
  description?: string;
}
