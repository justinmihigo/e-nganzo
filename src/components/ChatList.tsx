import React from 'react';

interface ChatListProps {
  chats: {
    id: string;
    user: {
      id: string;
      name: string;
      image: string;
      isOnline: boolean;
    };
    lastMessage: string;
    timestamp: string;
    unread: number;
  }[];
  selectedChatId: string;
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChatId,
  onSelectChat
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {chats.map(chat => (
        <button
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={`w-full flex items-center p-4 hover:bg-gray-50 border-b last:border-b-0
            ${selectedChatId === chat.id ? 'bg-purple-50' : ''}`}
        >
          <div className="relative">
            <img
              src={chat.user.image}
              alt={chat.user.name}
              className="w-12 h-12 rounded-full"
            />
            {chat.user.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium text-gray-900">{chat.user.name}</h3>
              <span className="text-sm text-gray-500">{chat.timestamp}</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
          </div>
          
          {chat.unread > 0 && (
            <div className="ml-4 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {chat.unread}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default ChatList; 