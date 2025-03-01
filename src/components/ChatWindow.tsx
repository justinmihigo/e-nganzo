import React, { useState } from 'react';
import { FiSend, FiImage, FiPaperclip } from 'react-icons/fi';

interface ChatWindowProps {
  chat: {
    id: string;
    user: {
      id: string;
      name: string;
      image: string;
      isOnline: boolean;
    };
    messages: {
      id: string;
      sender: string;
      content: string;
      timestamp: string;
    }[];
  };
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message sending
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b">
        <img
          src={chat.user.image}
          alt={chat.user.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-medium text-gray-900">{chat.user.name}</h3>
          <span className="text-sm text-green-500">
            {chat.user.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'me'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <button type="button" className="text-gray-500 hover:text-purple-600">
            <FiImage size={20} />
          </button>
          <button type="button" className="text-gray-500 hover:text-purple-600">
            <FiPaperclip size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700"
          >
            <FiSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow; 