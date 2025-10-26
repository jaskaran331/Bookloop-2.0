import React, { useState, useRef, useEffect } from 'react';
import { getChatInstance } from '../services/geminiService';
import type { Message } from '../types';
import { SendIcon } from '../components/icons/SendIcon';
import { GeminiIcon } from '../components/icons/GeminiIcon';

const GeminiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am BookLoop AI. How can I help you with your studies today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'other',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: String(messages.length + 1),
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user',
      avatarUrl: 'https://picsum.photos/seed/user/40/40'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = getChatInstance();
      const result = await chat.sendMessage({ message: input });
      const response = result.text;
      
      const aiMessage: Message = {
        id: String(messages.length + 2),
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'other',
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: Message = {
        id: String(messages.length + 2),
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'other',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md">
       <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center">
          <GeminiIcon className="w-8 h-8 text-primary-500 mr-3" />
          <h3 className="font-semibold text-lg">BookLoop AI Assistant</h3>
        </div>
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'other' && (
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                    <GeminiIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
            )}
            <div className={`max-w-md lg:max-w-xl px-4 py-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
              <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            </div>
             {msg.sender === 'user' && msg.avatarUrl && <img src={msg.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center flex-shrink-0">
                     <GeminiIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-primary-500 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about course material, get study tips, or anything else..."
            className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          <button type="submit" className="bg-primary-600 text-white rounded-full p-3 hover:bg-primary-700 transition-colors duration-200 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading} aria-label="Send message">
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeminiChat;