import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  author: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  isbn: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  coverImage?: string;

  @IsInt()
  @Min(1)
  totalCopies: number;

  @IsInt()
  genreId: number;
}