import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import './App.css';

const App = () => {
  const { current: socket } = useRef(io('ws://localhost:8000'));
  const contentRef = useRef(null);
  const [text, setText] = useState('');
  const [messages, setMessage] = useState([]);
  const handleBtnClick = () => socket.emit('chat message', text);

  useEffect(() => {
    contentRef.current.scrollTop = 9999;
  }, [messages.length]);

  useEffect(() => {
    try {
      socket.open();
      socket.on('chat message', msg => {
        setMessage(messages => [...messages, msg]);
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
      <header className="App-header" ref={contentRef}>
        {messages.map((item, index) => {
          return (
            <div key={index} style={getMessagesStyle(index)}>
              {item}
            </div>
          );
        })}
      </header>
      <footer className="App-footer">
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button disabled={!text.trim()} onClick={handleBtnClick}>
          {'Send'}
        </button>
      </footer>
    </div>
  );
};

export default App;
