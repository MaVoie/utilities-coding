import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function AiAssistantCreateAssistantSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new AI assistant' }),
    ApiParam({
      name: 'model',
      type: String,
      description: 'The language model to use for the assistant',
      required: true,
    }),
    ApiParam({
      name: 'name',
      type: String,
      description: 'Optional name for the assistant',
      required: false,
    }),
    ApiParam({
      name: 'instructions',
      type: String,
      description: 'Optional instructions for the assistant',
      required: false,
    }),
    ApiParam({
      name: 'tools',
      type: [Object],
      description: 'Optional array of tools for the assistant',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully created the assistant',
      // TODO: Must specify the response
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function AiAssistantStartThreadSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Start a new thread with an AI assistant' }),
    ApiResponse({
      status: 200,
      description: 'Successfully started the thread',
      // TODO: Must specify the response
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function AiAssistantGetTokensSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Getting number of tokens from a string' }),
    ApiResponse({
      status: 200,
      description: 'Successfully getting tokens number',
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function AiAssistantTranscribeThreadSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Transcribe a message with an AI Model' }),
    ApiResponse({
      status: 200,
      description: 'Successfully transcribed message',
      // TODO: Must specify the response
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function AiAssistantSendMessageSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Send a message to an AI assistant' }),
    ApiParam({
      name: 'threadId',
      type: String,
      description: 'The ID of the thread',
      required: true,
    }),
    ApiParam({
      name: 'assistantId',
      type: String,
      description: 'The ID of the assistant',
      required: true,
    }),
    ApiParam({
      name: 'message',
      type: String,
      description: 'The message to send',
      required: true,
    }),
    ApiParam({
      name: 'maxTokens',
      type: Number,
      description: 'Optional maximum number of tokens in the response',
      required: false,
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully sent the message',
      // TODO: Must specify the response
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function AiAssistantStreamResponseSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Stream the response from an AI assistant' }),
    ApiParam({
      name: 'threadId',
      type: String,
      description: 'The ID of the thread',
      required: true,
    }),
    ApiParam({
      name: 'runId',
      type: String,
      description: 'The ID of the message processing run',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully streamed the response',
      type: 'text/event-stream',
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}
