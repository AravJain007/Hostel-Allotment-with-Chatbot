// AdditionalInfoPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AdditionalInfo.css';

const AdditionalInfoPage = () => {
    const { roomNumber, blockName } = useParams();
    const studentCount = roomNumber % 10 < 5 ? 4 : 6;
    const [studentNames, setStudentNames] = useState(Array(studentCount).fill(''));

    const handleNameChange = (index, event) => {
        const newStudentNames = [...studentNames];
        newStudentNames[index] = event.target.value;
        setStudentNames(newStudentNames);
    };

    const [isFinalized, setIsFinalized] = useState(false);

    const finalizeRoomSelection = () => {
        // Logic to handle the finalization process
        console.log('Room finalized with students:', studentNames);
        setIsFinalized(true);
    };

    return (
      <div className="additional-info-container">
        <h1 className="additional-info-header">Additional Information</h1>
        <div className="additional-info-content">
          <p>Room Number: {roomNumber}</p>
          <p>Block Name: {blockName}</p>
          <p>Number of students: {studentCount}</p>
          {studentNames.map((name, index) => (
            <input
              key={index}
              type="text"
              value={name}
              placeholder={`Student ${index + 1} Name`}
              onChange={(e) => handleNameChange(index, e)}
              className="student-name-input"
            />
          ))}
          <button onClick={finalizeRoomSelection} className="finalize-button">
            Finalize Room Selection
          </button>
          {isFinalized && (
            <p className="congratulations-message">
              Congratulations {studentNames.join(', ')} for getting Room {roomNumber} in Block {blockName}!
            </p>
          )}
        </div>
      </div>
    );
};

export default AdditionalInfoPage;