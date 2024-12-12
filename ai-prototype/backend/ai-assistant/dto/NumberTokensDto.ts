import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NumberTokensDto {
  @ApiProperty({ description: 'The string text to get the number of tokens' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
