import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAssistantDto {
  @ApiProperty({ description: 'The language model to use for the assistant' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ description: 'Optional name for the assistant' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Optional instructions for the assistant' })
  @IsString()
  @IsOptional()
  instructions?: string;

  @ApiProperty({ description: 'Optional array of tools for the assistant' })
  @IsOptional()
  tools?: any[]; // You might want to consider a more specific type for tools if known
}
