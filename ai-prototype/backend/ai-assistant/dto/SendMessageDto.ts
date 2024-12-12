import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({ description: 'The ID of the user' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The ID of the conversation thread' })
  @IsString()
  @IsNotEmpty()
  threadId: string;

  @ApiProperty({ description: 'The ID of the assistant' })
  @IsString()
  @IsNotEmpty()
  assistantId: string;

  @ApiProperty({ description: 'The message to send' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Optional maximum number of tokens in the response',
  })
  @IsOptional()
  maxTokens?: number;
}
