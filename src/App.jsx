import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import './App.css';

const App = () => {
  const { current: socket } = useRef(io('http://localhost:8000'));
  const [text, setText] = useState('');
  const [messages, setMessage] = useState([]);
  const handleBtnClick = () => text && socket.emit('chat message', text);

  useEffect(() => {
    try {
      socket.open();
      socket.on('chat message', msg => {
        setMessage(prevMessages => [...prevMessages, msg]);
        setText('');
      });
    } catch (error) {
      console.error(error);
    }
    return () => {
      socket.close();
    };
  }, []);

  const getMessagesStyle = index => {
    return {
      backgroundColor: index % 2 ? 'black' : 'white',
      color: index % 2 ? 'white' : 'black'
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        {messages.map((item, index) => {
          return (
            <div key={index} style={getMessagesStyle(index)}>
              {item}
            </div>
          );
        })}
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={handleBtnClick}>{'Send'}</button>
      </header>
    </div>
  );
};

export default App;
