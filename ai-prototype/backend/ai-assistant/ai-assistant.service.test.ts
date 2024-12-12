import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import {
  AssistantsClient,
  Assistant,
  AssistantThread,
  ThreadRun,
} from '@azure/openai-assistants';
import { OpenAIClient } from '@azure/openai';
import { AiAssistantService } from './ai-assistant.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { NumberTokensDto } from './dto/NumberTokensDto';
import { AssistantOptions, AIResponse } from './ai-assistant.types';

jest.mock('@azure/openai-assistants');
jest.mock('@azure/openai');
jest.mock('js-tiktoken', () => ({
  getEncoding: jest.fn().mockReturnValue({
    encode: jest.fn().mockReturnValue({ length: 10 }),
  }),
}));

describe('AiAssistantService', () => {
  let service: AiAssistantService;
  let assistantClient: jest.Mocked<AssistantsClient>;
  let openAIClient: jest.Mocked<OpenAIClient>;
  let conversationsService: jest.Mocked<ConversationsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiAssistantService,
        {
          provide: ConversationsService,
          useValue: { createMessage: jest.fn() },
        },
        {
          provide: 'CONFIG_KEYS',
          useValue: {
            prefixazure_ai_conf: {
              apikey: 'test-api-key',
              apikeywesteurope: 'test-api-key-west-europe',
            },
          },
        },
      ],
    }).compile();

    service = module.get<AiAssistantService>(AiAssistantService);
    assistantClient = service[
      'assistantClient'
    ] as jest.Mocked<AssistantsClient>;
    openAIClient = service['openAIClient'] as jest.Mocked<OpenAIClient>;
    conversationsService = module.get(ConversationsService);
  });

  describe('getTokensFromString', () => {
    it('should return the correct number of tokens', async () => {
      const dto: NumberTokensDto = { text: 'Test string' };
      const result = await service.getTokensFromString(dto);
      expect(result).toBe(10);
    });

    it('should return 0 for empty string', async () => {
      const dto: NumberTokensDto = { text: '' };
      const result = await service.getTokensFromString(dto);
      expect(result).toBe(0);
    });
  });

  describe('createAssistant', () => {
    it('should create an assistant successfully', async () => {
      const mockAssistant: Partial<Assistant> = { id: 'test-assistant-id' };
      assistantClient.createAssistant = jest
        .fn()
        .mockResolvedValue(mockAssistant);

      const options: AssistantOptions = {
        model: 'gpt-4',
        name: 'Test Assistant',
        instructions: 'Test instructions',
        tools: [],
      };

      const result = await service.createAssistant(options);
      expect(result).toBe('test-assistant-id');
      expect(assistantClient.createAssistant).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'gpt-4',
          name: 'Test Assistant',
          instructions:
            service.commonInstructions.join(', ') + 'Test instructions',
          tools: [],
        }),
      );
    });

    it('should throw HttpException on error', async () => {
      assistantClient.createAssistant = jest
        .fn()
        .mockRejectedValue(new Error('API Error'));

      const options: AssistantOptions = {
        model: 'gpt-4',
        name: 'Test Assistant',
        instructions: 'Test instructions',
        tools: [],
      };

      await expect(service.createAssistant(options)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('startThread', () => {
    it('should start a thread successfully', async () => {
      const mockThread: Partial<AssistantThread> = { id: 'test-thread-id' };
      assistantClient.createThread = jest.fn().mockResolvedValue(mockThread);

      const result = await service.startThread();
      expect(result).toBe('test-thread-id');
      expect(assistantClient.createThread).toHaveBeenCalled();
    });

    it('should throw HttpException on error', async () => {
      assistantClient.createThread = jest
        .fn()
        .mockRejectedValue(new Error('API Error'));

      await expect(service.startThread()).rejects.toThrow(HttpException);
    });
  });

  describe('sendMessage', () => {
    it('should send a message and return AI response', async () => {
      const mockRun: Partial<ThreadRun> = {
        id: 'test-run-id',
        status: 'completed',
      };
      const mockAIResponse: AIResponse = {
        content: 'AI response',
        progression: 50,
        suggestions: ['Suggestion 1', 'Suggestion 2'],
      };

      assistantClient.createMessage = jest.fn().mockResolvedValue({});
      assistantClient.createRun = jest.fn().mockResolvedValue(mockRun);
      assistantClient.getRun = jest.fn().mockResolvedValue(mockRun);
      assistantClient.listMessages = jest.fn().mockResolvedValue({
        data: [
          {
            role: 'assistant',
            content: [
              { type: 'text', text: { value: JSON.stringify(mockAIResponse) } },
            ],
          },
        ],
      });

      const result = await service.sendMessage(
        'user-id',
        'thread-id',
        'assistant-id',
        'Hello',
      );
      expect(result).toEqual(mockAIResponse);
      expect(conversationsService.createMessage).toHaveBeenCalledTimes(2);
    });

    it('should throw HttpException on error', async () => {
      assistantClient.createMessage = jest
        .fn()
        .mockRejectedValue(new Error('API Error'));

      await expect(
        service.sendMessage('user-id', 'thread-id', 'assistant-id', 'Hello'),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('transcribe', () => {
    it('should transcribe audio successfully', async () => {
      const mockTranscription = 'Transcribed text';
      openAIClient.getAudioTranscription = jest
        .fn()
        .mockResolvedValue({ text: mockTranscription });

      const result = await service.transcribe('base64AudioString');
      expect(result).toBe(mockTranscription);
      expect(openAIClient.getAudioTranscription).toHaveBeenCalled();
    });

    it('should throw HttpException on error', async () => {
      openAIClient.getAudioTranscription = jest
        .fn()
        .mockRejectedValue(new Error('API Error'));

      await expect(service.transcribe('base64AudioString')).rejects.toThrow(
        HttpException,
      );
    });
  });
});
