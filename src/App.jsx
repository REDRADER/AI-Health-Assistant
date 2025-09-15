// src/App.jsx
import React, { useState, useEffect } from 'react';
import ChatContainer from './components/ChatContainer';
import Header from './components/Header';
import DisclaimerModal from './components/DisclaimerModal.jsx';
import QuickSymptoms from './components/QuickSymptoms.jsx';
import { getMedicalResponse } from './services/aiService';

function App() {
  const [messages, setMessages] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('health-chat-history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add welcome message
      const welcomeMessage = {
        id: Date.now(),
        type: 'ai',
        content: "Hello! I'm your AI Health Assistant. I can help you understand symptoms and provide general health information. Please describe your symptoms, and I'll do my best to provide helpful guidance.\n\n⚠️ **Important**: This is not a substitute for professional medical care. For emergencies, please contact emergency services immediately.",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
    // Initialize theme preference
    const storedTheme = localStorage.getItem('theme-preference');
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      setTheme(storedTheme);
    } else {
      setTheme('system');
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('health-chat-history', JSON.stringify(messages));
  }, [messages]);

  // Apply theme to document root and persist
  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
    root.classList.toggle('dark', effectiveTheme === 'dark');
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const handleSendMessage = async (message) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await getMedicalResponse(message);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble right now. Please try again later or consult with a healthcare professional.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('health-chat-history');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <Header onShowDisclaimer={() => setShowDisclaimer(true)} theme={theme} onToggleTheme={toggleTheme} />
      
      <div className="flex max-w-7xl mx-auto">
        <QuickSymptoms onSymptomClick={handleSendMessage} />
        
        <main className="flex-1">
          <ChatContainer
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onClearChat={clearChat}
          />
        </main>
      </div>

      {showDisclaimer && (
        <DisclaimerModal onClose={() => setShowDisclaimer(false)} />
      )}
    </div>
  );
}

export default App;
