import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  AiAssistantCreateAssistantSwagger,
  AiAssistantGetTokensSwagger,
  AiAssistantSendMessageSwagger,
  AiAssistantStartThreadSwagger,
  AiAssistantTranscribeThreadSwagger,
} from './ai-assistant.decorators';
import { AiAssistantService } from './ai-assistant.service';
import { AIResponse } from './ai-assistant.types';
import { CreateAssistantDto } from './dto/CreateAssistantDto';
import { NumberTokensDto } from './dto/NumberTokensDto';
import { SendMessageDto } from './dto/SendMessageDto';

@ApiTags('Ai Assistant')
@Controller('/ai-assistant')
export class AiAssistantController {
  constructor(private readonly aiAssistantService: AiAssistantService) {}

  @Post('/get-tokens')
  @AiAssistantGetTokensSwagger()
  async getTokens(@Body() data: NumberTokensDto): Promise<{ number: number }> {
    const number = await this.aiAssistantService.getTokensFromString(data);
    return { number };
  }

  @Post('/create')
  @AiAssistantCreateAssistantSwagger()
  async createAssistant(
    @Body() data: CreateAssistantDto,
  ): Promise<{ assistantId: string }> {
    const assistantId = await this.aiAssistantService.createAssistant(data);
    return { assistantId };
  }

  @Post('/start-thread')
  @AiAssistantStartThreadSwagger()
  async startThread(): Promise<{ threadId: string }> {
    const threadId = await this.aiAssistantService.startThread();
    return { threadId };
  }

  @Post('/get-transcription')
  @AiAssistantTranscribeThreadSwagger()
  async getTranscription(@Body() data: any): Promise<{ transcription: any }> {
    const transcription = await this.aiAssistantService.transcribe(data.audio);
    return { transcription };
  }

  @Post('/send-message')
  @AiAssistantSendMessageSwagger()
  async sendMessage(@Body() data: SendMessageDto): Promise<AIResponse> {
    const { threadId, assistantId, message, maxTokens, userId } = data;
    const response = await this.aiAssistantService.sendMessage(
      userId,
      threadId,
      assistantId,
      message,
      { maxTokens },
    );
    return response;
  }
}
