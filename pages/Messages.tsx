import React, { useState, useRef, useEffect } from 'react';
import type { Message, User } from '../types.ts';
import { SendIcon } from '../components/icons/SendIcon.tsx';

const mockConversations: { user: User, lastMessage: string, timestamp: string }[] = [
  {
    user: { id: 'user2', name: 'John Smith', avatarUrl: 'https://picsum.photos/seed/john/40/40', campus: 'State University', major: 'History', listingsCount: 2 },
    lastMessage: 'Sounds good, see you then!',
    timestamp: '10:42 AM'
  },
  {
    user: { id: 'user3', name: 'Emily White', avatarUrl: 'https://picsum.photos/seed/emily/40/40', campus: 'State University', major: 'Biology', listingsCount: 1 },
    lastMessage: 'Is the textbook still available?',
    timestamp: 'Yesterday'
  },
  {
    user: { id: 'user4', name: 'Mike Brown', avatarUrl: 'https://picsum.photos/seed/mike/40/40', campus: 'State University', major: 'Physics', listingsCount: 1 },
    lastMessage: 'Perfect, I will take it.',
    timestamp: '3 days ago'
  }
];

const mockMessages: Message[] = [
  { id: '1', text: 'Hey, I saw your listing for the chemistry lab coat. Is it still available?', timestamp: '10:30 AM', sender: 'other', avatarUrl: 'https://picsum.photos/seed/john/40/40' },
  { id: '2', text: 'Hi! Yes, it is.', timestamp: '10:31 AM', sender: 'user', avatarUrl: 'https://picsum.photos/seed/user/40/40' },
  { id: '3', text: 'Great! Could we meet on campus tomorrow around noon?', timestamp: '10:35 AM', sender: 'other', avatarUrl: 'https://picsum.photos/seed/john/40/40' },
  { id: '4', text: 'Sounds good, see you then!', timestamp: '10:42 AM', sender: 'user', avatarUrl: 'https://picsum.photos/seed/user/40/40' },
];

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: String(messages.length + 1),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user',
      avatarUrl: 'https://picsum.photos/seed/user/40/40'
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* Conversation List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map(convo => (
            <div
              key={convo.user.id}
              onClick={() => setSelectedConversation(convo)}
              className={`p-4 flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 ${selectedConversation.user.id === convo.user.id ? 'bg-primary-50 dark:bg-slate-700/50' : ''}`}
            >
              <img src={convo.user.avatarUrl} alt={convo.user.name} className="w-12 h-12 rounded-full object-cover mr-4" loading="lazy" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{convo.user.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{convo.timestamp}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{convo.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center">
          <img src={selectedConversation.user.avatarUrl} alt={selectedConversation.user.name} className="w-10 h-10 rounded-full object-cover mr-3" />
          <h3 className="font-semibold text-lg">{selectedConversation.user.name}</h3>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'other' && msg.avatarUrl && <img src={msg.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full object-cover" loading="lazy" />}
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-primary-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 opacity-70 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>{msg.timestamp}</p>
              </div>
              {msg.sender === 'user' && msg.avatarUrl && <img src={msg.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full object-cover" loading="lazy" />}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button type="submit" className="bg-primary-600 text-white rounded-full p-3 hover:bg-primary-700 transition-colors duration-200 flex-shrink-0" aria-label="Send message">
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;