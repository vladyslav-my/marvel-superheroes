import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  real_name: string;

  @IsString()
  @IsNotEmpty()
  origin_description: string;

  @IsString()
  @IsNotEmpty()
  superpowers: string;

  @IsString()
  @IsNotEmpty()
  catch_phrase: string;

  @IsArray()
  images: string[];
}
