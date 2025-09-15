// src/components/MessageBubble.jsx
import React from 'react';

const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-medical-primary text-white rounded-br-none'
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-none'
        }`}
      >
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div className="text-sm leading-relaxed">{message.content}</div>
        {message.timestamp && (
          <div className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;


