// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import RoomChoice from './RoomChoice';
import ShowRooms from './ShowRooms';
import AdditionalInfoPage from './AdditionalInfoPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={isLoggedIn ? <RoomChoice /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/showrooms" element={<ShowRooms />} />
          <Route path="/additional/:roomNumber/:blockName" element={<AdditionalInfoPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;