import { Test, TestingModule } from '@nestjs/testing';
import { AiAssistantController } from './ai-assistant.controller';
import { AiAssistantService } from './ai-assistant.service';
import { AIResponse } from './ai-assistant.types';
import { CreateAssistantDto } from './dto/CreateAssistantDto';
import { NumberTokensDto } from './dto/NumberTokensDto';
import { SendMessageDto } from './dto/SendMessageDto';

describe('AiAssistantController', () => {
  let controller: AiAssistantController;
  let service: AiAssistantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiAssistantController],
      providers: [
        {
          provide: AiAssistantService,
          useValue: {
            createAssistant: jest.fn(),
            startThread: jest.fn(),
            sendMessage: jest.fn(),
            getTokensFromString: jest.fn(),
            transcribe: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AiAssistantController>(AiAssistantController);
    service = module.get<AiAssistantService>(AiAssistantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTokens', () => {
    it('should return the number of tokens for the given text', async () => {
      const numberTokensDto: NumberTokensDto = { text: 'Hello, world!' };
      const expectedTokens = 3;

      jest
        .spyOn(service, 'getTokensFromString')
        .mockResolvedValue(expectedTokens);

      const result = await controller.getTokens(numberTokensDto);

      expect(result).toEqual({ number: expectedTokens });
      expect(service.getTokensFromString).toHaveBeenCalledWith(numberTokensDto);
    });
  });

  describe('createAssistant', () => {
    it('should create an assistant and return its ID', async () => {
      const createAssistantDto: CreateAssistantDto = {
        model: 'Test Assistant',
      };
      const assistantId = '123';
      jest.spyOn(service, 'createAssistant').mockResolvedValue(assistantId);

      const result = await controller.createAssistant(createAssistantDto);

      expect(result).toEqual({ assistantId });
      expect(service.createAssistant).toHaveBeenCalledWith(createAssistantDto);
    });
  });

  describe('startThread', () => {
    it('should start a thread and return its ID', async () => {
      const threadId = '456';
      jest.spyOn(service, 'startThread').mockResolvedValue(threadId);

      const result = await controller.startThread();

      expect(result).toEqual({ threadId });
      expect(service.startThread).toHaveBeenCalled();
    });
  });

  describe('getTranscription', () => {
    it('should return the transcription for the given audio', async () => {
      const data = { audio: 'base64EncodedAudio' };
      const transcription = 'Transcribed text';

      jest.spyOn(service, 'transcribe').mockResolvedValue(transcription);

      const result = await controller.getTranscription(data);

      expect(result).toEqual({ transcription });
      expect(service.transcribe).toHaveBeenCalledWith(data.audio);
    });
  });

  describe('sendMessage', () => {
    it('should send a message and return the AI response', async () => {
      const sendMessageDto: SendMessageDto = {
        threadId: 'thread123',
        assistantId: 'assistant123',
        message: 'Hello, AI!',
        maxTokens: 100,
        userId: 'user123',
      };
      const aiResponse: AIResponse = { content: 'AI response' };

      jest.spyOn(service, 'sendMessage').mockResolvedValue(aiResponse);

      const result = await controller.sendMessage(sendMessageDto);

      expect(result).toEqual(aiResponse);
      expect(service.sendMessage).toHaveBeenCalledWith(
        sendMessageDto.userId,
        sendMessageDto.threadId,
        sendMessageDto.assistantId,
        sendMessageDto.message,
        { maxTokens: sendMessageDto.maxTokens },
      );
    });
  });
});
