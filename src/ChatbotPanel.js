// ChatbotPanel.js
import React, { useState } from 'react';
import './ChatbotPanel.css';
import ReactMarkdown from 'react-markdown'; // You need to install this package

const ChatbotPanel = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  // Function to get server response from local LLM server
  const getServerResponse = async (userMessage, setConversation) => {
    // Convert the conversation history to the format expected by the server
    const messages = conversation.map(message => ({
      role: message.sender,
      content: message.text
    }));
  
    // Add the new user message to the conversation history
    messages.push({
      role: 'user',
      content: userMessage
    });
  
    const requestBody = {
      messages,
      "temperature": 0.7, 
      "max_tokens": 256,
      "stream": true
    };
  
    let serverResponse = '';
    try {
      const response = await fetch('http://localhost:1234/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseText = await response.text();
      const lines = responseText.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6);
          if (jsonStr !== '[DONE]') {
            const data = JSON.parse(jsonStr);
            if (data.choices && data.choices.length > 0 && data.choices[0].delta && data.choices[0].delta.content) {
              serverResponse += data.choices[0].delta.content;
            }
          }
        }
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  
    if (serverResponse) {
      setConversation(conversation => [...conversation, { sender: 'assistant', text: serverResponse }]);
    }
  };
  
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    const message = userInput.trim();
    if (message) {
      setConversation([...conversation, { sender: 'user', text: message }]);
      getServerResponse(message, setConversation);
      setUserInput('');
    }
  };

  const renderMarkdown = (message) => {
    return `**${message.sender}**: ${message.text}\n\n`;
  };

  const markdownText = conversation.map(renderMarkdown).join('');

  return (
    <div className="chatbot-panel">
      <div className="chatbot-conversation">
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type a message..."
          className="chatbot-input"
        />
        <button onClick={handleSendMessage} className="chatbot-send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatbotPanel;
