export interface AssistantOptions {
  model: string;
  name?: string;
  instructions?: string;
  tools?: Array<any>; // You might want to define a more specific type for tools
}

export interface MessageOptions {
  maxTokens?: number;
}

export interface AIResponse {
  content: string | null;
  progression?: number;
  suggestions?: string[];
}

export enum StatusStreamData {
  Ended = 'Ended',
  OnGoing = 'OnGoing',
  Idle = 'Idle',
}
