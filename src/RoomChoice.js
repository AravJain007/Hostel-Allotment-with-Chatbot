// RoomChoice.js
import React, { useState } from 'react';
import './RoomChoice.css';
import { useNavigate } from 'react-router-dom';
import ChatbotPanel from './ChatbotPanel';

const RoomChoice = () => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const navigate = useNavigate();

  const handleBlockSelection = (block) => {
    setSelectedBlock(block);
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const handleConfirmButtonClick = () => {
    // Logic to handle confirm button click
    navigate('/showrooms', {
      state: { selectedBlock, selectedRoom }
    });
  };

  const [showChatbot, setShowChatbot] = useState(false); // State to manage chatbot visibility

  // Function to toggle chatbot panel
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="room-selection-container">

    <nav className="navbar">
        <div className="left">
          <h1>Room Selection</h1>
        </div>
        <div className="right">
          <h1><a href="https://aravjain007.github.io/" className="portfolio-link">Portfolio</a></h1>
        </div>
      </nav>

      <div className="table-container">
        <h2>Block Selection</h2>
        <table className="block-table">
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <td key={colIndex} onClick={() => handleBlockSelection(String.fromCharCode(65 + rowIndex * 5 + colIndex))} className={selectedBlock === String.fromCharCode(65 + rowIndex * 5 + colIndex) ? 'selected' : ''}>
                    {String.fromCharCode(65 + rowIndex * 5 + colIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-container">
        <h2>Room Selection</h2>
        <table className="room-table">
          <tbody>
          {Array.from({ length: 15 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 10 }).map((_, colIndex) => {
                const roomNumber = 100 * (rowIndex + 1) + colIndex;
                return (
                  <td
                    key={colIndex}
                    onClick={() => handleRoomSelection(roomNumber)}
                    className={selectedRoom === roomNumber ? 'selected' : ''}
                  >
                    {roomNumber}
                  </td>
                );
              })}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <button onClick={toggleChatbot} className="chatbot-button">Chat</button>
        {showChatbot && <ChatbotPanel />}
      <button onClick={handleConfirmButtonClick} className="confirm-button">View Room Images</button>
    </div>
  );
};

export default RoomChoice;