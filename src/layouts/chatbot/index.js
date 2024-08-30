// src/Chat.js

import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';



const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post('https://united-wavelet-422322-m7.uc.r.appspot.com/chat/ask', {
        chat_id: 'test2',
        message: message
      });

      setChatHistory(response.data.history);
      setMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={styles.container}>
        <div style={styles.chatWindow}>
          {chatHistory.map((msg, index) => (
            <div key={index} style={styles.messageContainer}>
              <strong>{msg.author}: </strong>
              <ReactMarkdown children={msg.content} remarkPlugins={[remarkGfm]} />
            </div>
          ))}
        </div>
  
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.input}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage} style={styles.button} disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '80vh',
    padding: '10px',
    boxSizing: 'border-box',
  },
  chatWindow: {
    flex: 1,
    overflowY: 'scroll',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  messageContainer: {
    marginBottom: '10px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Chat;
