import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage, MessageRole } from '../types';

const SYSTEM_INSTRUCTION = `Você é um assistente virtual para a 'Data Byte Unidade Cotia', um centro de formação profissional. Sua principal fonte de informação é o site https://www.databytecotia.com.br/. A interface do chat exibe um ícone de celular, simbolizando a comunicação móvel e o acesso à informação. Seja amigável, prestativo e responda em português do Brasil. Se a pergunta for sobre eventos atuais, notícias ou informações que mudam rapidamente, use o Google Search para obter a resposta mais precisa. Quando solicitado, o endereço de contato é: Av. Professor José Barreto, 1162 - Jd. Dinorah, Cotia - SP, 06703-000. O telefone de contato é (11) 4614-4164.`;

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const initializeChat = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  // Convert ChatMessage[] to Gemini's history format
  const geminiHistory = [
    {
      role: 'user',
      parts: [{ text: "Olá" }],
    },
    {
      role: 'model',
      parts: [{ text: "Olá! Sou o assistente virtual da Data Byte Cotia. Como posso te ajudar hoje com nossos cursos e serviços de formação profissional?" }],
    }
  ];

  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: geminiHistory,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    },
  });
};

export const getChatResponse = async (userInput: string, history: ChatMessage[]): Promise<string> => {
  if (!chat) {
    initializeChat();
  }

  if (!chat) {
    throw new Error("Chat initialization failed.");
  }
  
  try {
    const response = await chat.sendMessage({ message: userInput });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    // In case of an error, try re-initializing the chat for the next attempt
    chat = null;
    throw new Error("Failed to get response from AI.");
  }
};
