import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen.jsx';
import RoomSetup from './components/RoomSetup.jsx';
import RoomScreen from './components/RoomScreen.jsx';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userData, setUserData] = useState(null);
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    // localStorage'dan kullanıcı ve oda bilgilerini yükle
    const savedUserData = localStorage.getItem('userData');
    const savedRoomData = localStorage.getItem('currentRoom');

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      if (savedRoomData) {
        setRoomData(JSON.parse(savedRoomData));
        setCurrentScreen('room');
      } else {
        setCurrentScreen('setup');
      }
    }
  }, []);

  const handleLogin = (user) => {
    setUserData(user);
    setCurrentScreen('setup');
  };

  const handleCreateRoom = (room) => {
    setRoomData(room);
    setCurrentScreen('room');
  };

  const handleJoinRoom = (room) => {
    setRoomData(room);
    setCurrentScreen('room');
  };

  const handleLeaveRoom = () => {
    localStorage.removeItem('currentRoom');
    setRoomData(null);
    setCurrentScreen('setup');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('currentRoom');
    setUserData(null);
    setRoomData(null);
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'login' && (
        <LoginScreen onNext={handleLogin} />
      )}
      
      {currentScreen === 'setup' && userData && (
        <RoomSetup 
          userData={userData}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
        />
      )}
      
      {currentScreen === 'room' && userData && roomData && (
        <RoomScreen 
          userData={userData}
          roomData={roomData}
          onLeave={handleLeaveRoom}
        />
      )}
    </div>
  );
}

export default App;
