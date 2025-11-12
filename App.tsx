
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, MessageRole } from './types';
import { getChatResponse } from './services/geminiService';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: MessageRole.MODEL,
      content: "Olá! Sou o assistente virtual da Data Byte Cotia. Como posso te ajudar hoje com nossos cursos e serviços de formação profissional?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatHistoryRef = useRef<ChatMessage[]>(messages);

  useEffect(() => {
    chatHistoryRef.current = messages;
  }, [messages]);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: MessageRole.USER, content: userInput };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getChatResponse(userInput, chatHistoryRef.current.slice(1)); // Exclude initial greeting
      const modelMessage: ChatMessage = { role: MessageRole.MODEL, content: response };
      setMessages(prevMessages => [...prevMessages, modelMessage]);
    } catch (err) {
      const errorMessage = "Desculpe, ocorreu um erro ao me comunicar com a IA. Por favor, tente novamente mais tarde.";
      setError(errorMessage);
       setMessages(prevMessages => [...prevMessages, { role: MessageRole.MODEL, content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-slate-800 text-white flex flex-col h-screen font-sans">
      <Header />
      <main className="flex-1 overflow-hidden">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
};

export default App;