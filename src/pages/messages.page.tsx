import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

const MessagesPage: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>('');

  // Sample chats data - would come from API
  const chats = [
    {
      id: '1',
      user: {
        id: 'user1',
        name: 'Marie Uwase',
        image: 'https://example.com/user1.jpg',
        isOnline: true
      },
      lastMessage: 'Looking forward to the exhibition!',
      timestamp: '2m ago',
      unread: 2,
      messages: [
        // Add sample messages
      ]
    },
    // Add more sample chats
  ];

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ChatList
              chats={chats}
              selectedChatId={selectedChatId}
              onSelectChat={setSelectedChatId}
            />
          </div>
          
          <div className="md:col-span-2 h-[600px]">
            {selectedChat ? (
              <ChatWindow chat={selectedChat} />
            ) : (
              <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-md">
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage; 