import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  Assistant,
  AssistantsClient,
  AssistantThread,
  AzureKeyCredential,
  ThreadRun,
} from '@azure/openai-assistants';
import { OpenAIClient } from '@azure/openai';
import { getEncoding, TiktokenEncoding } from 'js-tiktoken';

import env from 'src/env';

import logs from 'src/helpers/logs';
import { NumberTokensDto } from './dto/NumberTokensDto';
import { ConversationsService } from 'src/conversations/conversations.service';
import { CreateMessageDto } from 'src/conversations/dto/CreateMessage.dto';
import { Receiver, Sender } from 'src/conversations/conversations.types';
import {
  AIResponse,
  AssistantOptions,
  MessageOptions,
} from './ai-assistant.types';

const {
  createAssistant: createAssistantLog,
  startThread: startThreadLog,
  sendMessage: sendMessageLog,
  transcribe: transcribeLog,
} = logs.aiAssistant.services;

@Injectable()
export class AiAssistantService {
  private assistantClient: AssistantsClient;
  private openAIClient;
  private tiktokenEncoding: TiktokenEncoding = 'cl100k_base';
  commonInstructions: string[] = [
    'Répond-moi toujours dans un format JSON',
    'Les attributs du JSON doîvent être toujours : progression: number, content: string , suggestions: string[]',
    'Effectue dans le "content" une mise en page agréable et impactante en langage markdown en utilisant le gras, surligné et italique notamment, mais aussi des puces si néceassaire ou des émojis.',
    'Guide-moi étape par étape.',
    "Pour chacune des étapes pose moi une question après l'autre en attendant que je réponde à la première avant de passer à la suivante.",
    'Encourage-moi, donne-moi des conseils, illustre tes propos par des exemples parlants.',
    'Soit le moins verbeux possible pour un échange type SMS mais sans sacrifier la qualité de tes réponses (tu peux ajouter des émojis).',
    `Peu importe les sujets que je soulève au cours de notre conversation, reste centré sur nos objectifs initiaux. Si je dévie du sujet, fais-moi savoir poliment que cela ne relève pas de ton expertise et redirige la discussion vers notre objectif principal. Assure-toi de rester sur le sujet sans te laisser entraîner par d'autres thèmes." (modifié)`,
  ];

  constructor(
    private readonly conversationService: ConversationsService,
    @Inject('CONFIG_KEYS') private configKeys: any,
  ) {
    this.assistantClient = new AssistantsClient(
      env.azureAI.endpoint,
      new AzureKeyCredential(
        configKeys[`${env.prefix}azure_ai_conf`]?.apikey ||
          'xxxxx',
      ),
    );
    this.openAIClient = new OpenAIClient(
      env.azureAI.endpointWestEurope,
      new AzureKeyCredential(
        configKeys[`${env.prefix}azure_ai_conf`]?.apikeywesteurope ||
          'xxxxx',
      ),
    );
  }

  async getTokensFromString(data: NumberTokensDto): Promise<number> {
    const enc = getEncoding(this.tiktokenEncoding);

    if (data.text != '') {
      return enc.encode(data.text).length;
    }
    return 0;
  }

  async createAssistant(options: AssistantOptions): Promise<string> {
    console.info(createAssistantLog.infos.CALL_FUNCTION);
    console.time(createAssistantLog.time.COUNT);

    let assistant: Assistant;

    try {
      assistant = await this.assistantClient.createAssistant({
        model: options.model,
        name: options.name,
        instructions: this.commonInstructions.join(', ') + options.instructions,
        tools: options.tools,
      });
    } catch (err) {
      throw new HttpException(
        createAssistantLog.errors.ON_CREATE,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: new Error(err),
          description: err,
        },
      );
    }

    console.log(createAssistantLog.logs.on_create, assistant.id);

    console.timeEnd(createAssistantLog.time.COUNT);
    return assistant.id;
  }

  async startThread(): Promise<string> {
    console.info(startThreadLog.infos.CALL_FUNCTION);
    console.time(startThreadLog.time.COUNT);

    let thread: AssistantThread;
    try {
      thread = await this.assistantClient.createThread({});
    } catch (err) {
      throw new HttpException(
        startThreadLog.errors.ON_START,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: new Error(err),
          description: err,
        },
      );
    }
    console.log(startThreadLog.logs.ON_START, thread.id);

    console.timeEnd(startThreadLog.time.COUNT);
    return thread.id;
  }

  async sendMessage(
    userId: string,
    threadId: string,
    assistantId: string,
    message: string,
    options: MessageOptions = {},
  ): Promise<AIResponse> {
    console.info(sendMessageLog.infos.CALL_FUNCTION);
    console.time(sendMessageLog.time.COUNT);

    let aiResponse: AIResponse;

    let contentAIMsg: string;

    let run: ThreadRun;

    try {
      console.time('assistantClient.createMessage');
      await this.assistantClient.createMessage(threadId, 'user', message);
      console.timeEnd('assistantClient.createMessage');

      console.time('assistantClient.createRun & database:save');
      const inputMessage: CreateMessageDto = {
        userId,
        threadId,
        contents: [{ type: 'text', value: message }],
        sender: Sender.USER,
        receiver: Receiver.ASSISTANT,
      };
      [run] = await Promise.all([
        this.assistantClient.createRun(threadId, {
          assistantId: assistantId,
          ...(options.maxTokens && { maxTokens: options.maxTokens }),
        }),
        this.conversationService.createMessage(inputMessage),
      ]);
      console.timeEnd('assistantClient.createRun & database:save');

      console.log('the run is', run);
      // return error if run.status is failed

      console.time('checkRunStatus:func');
      do {
        await new Promise((resolve) => setTimeout(resolve, 500));
        run = await this.assistantClient.getRun(threadId, run.id);
      } while (run.status === 'queued' || run.status === 'in_progress');
      console.timeEnd('checkRunStatus:func');

      if (run.status === 'error') {
        // return an error
        throw new HttpException(
          sendMessageLog.errors.ON_SEND,
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            description: 'Error on Run ',
          },
        );
      }

      console.time('listMessages:func');
      const response = await this.assistantClient.listMessages(threadId, {
        limit: 1,
        order: 'desc',
      });

      if (response.data?.length > 0 && response.data[0].role === 'assistant') {
        for (const content of response.data[0].content) {
          if (content.type === 'text') {
            contentAIMsg = content.text.value;
          }
        }
      }

      try {
        // Remove the ```json and ``` wrapper
        const jsonString = contentAIMsg
          .replace(/^```json\n|\n```$/g, '')
          .trim();
        aiResponse = JSON.parse(jsonString);
      } catch (error) {
        console.log('error in parsing', error);
        aiResponse = {
          content: contentAIMsg,
        };
      }

      console.log('aiResponse', aiResponse);

      console.timeEnd('listMessages:func');

      console.time('database:save');
      const outputMessage: CreateMessageDto = {
        userId,
        threadId,
        contents: [{ type: 'text', value: aiResponse.content }],
        progression: aiResponse.progression,
        suggestions: aiResponse.suggestions,
        sender: Sender.ASSISTANT,
        receiver: Receiver.USER,
        runId: run.id,
      };
      await this.conversationService.createMessage(outputMessage);
      console.timeEnd('database:save');
    } catch (err) {
      throw new HttpException(
        sendMessageLog.errors.ON_SEND,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: new Error(err),
          description: err,
        },
      );
    }

    console.log(sendMessageLog.logs.ON_SEND, run.id);
    console.timeEnd(sendMessageLog.time.COUNT);

    return aiResponse;
  }

  async transcribe(base64Audio: string) {
    const deploymentName = env.azureAI.audioModel;

    let transcription = null;

    try {
      // Decode base64 string to a Buffer
      const buffer = Buffer.from(base64Audio, 'base64');

      // Convert Buffer to Uint8Array
      const uint8Array = new Uint8Array(buffer);

      const response = await this.openAIClient.getAudioTranscription(
        deploymentName,
        uint8Array,
        { fileFormat: 'mp3' }, // Adjust based on your audio file format
      );
      transcription = response?.text;
    } catch (err) {
      throw new HttpException(
        transcribeLog.errors.ON_TRANSCRIBE,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: new Error(err),
          description: err,
        },
      );
    }
    return transcription;
  }
}
