import { Module } from '@nestjs/common';
import { ConversationsService } from 'src/conversations/conversations.service';
import { AiAssistantController } from './ai-assistant.controller';
import { AiAssistantService } from './ai-assistant.service';

@Module({
  controllers: [AiAssistantController],
  providers: [AiAssistantService, ConversationsService],
})
export class AiAssistantModule {}
