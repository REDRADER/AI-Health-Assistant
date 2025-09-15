// src/components/ChatContainer.jsx
import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';

const ChatContainer = ({ messages, onSendMessage, isLoading, onClearChat }) => {
  const [input, setInput] = useState('');
  const [charCount, setCharCount] = useState(0);
  const messagesEndRef = useRef(null);
  const maxLength = 500;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setInput(value);
      setCharCount(value.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      setCharCount(0);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && <LoadingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Describe your symptoms
          </span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${charCount > maxLength * 0.9 ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>
              {charCount}/{maxLength}
            </span>
            {messages.length > 1 && (
              <button
                onClick={onClearChat}
                className="text-sm text-red-500 hover:text-red-400"
              >
                Clear Chat
              </button>
            )}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Please describe your symptoms in detail..."
              className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg resize-none focus:ring-2 focus:ring-medical-primary focus:border-transparent"
              rows="2"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
