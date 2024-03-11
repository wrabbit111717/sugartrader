import React, { useState, useEffect, useRef } from 'react';
import { Button, Group, Paper, TextInput, Avatar } from '@mantine/core';
import socket from "@service/socketService";

interface Message {
  avatar: string;
  name: string;
  text?: string;
  file?: File | null;
  fileName?: string;
  downloadLink?: string;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [fileUploadStatus, setFileUploadStatus] = useState<string | null>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const [offerId, setOfferId] = useState<string>('123');
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleJoinRoom = () => {
    if (offerId) {
      socket.emit('join room', offerId.trim());
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileUploadStatus(uploadedFile.name);
    }
  };

  const handleSendMessage = () => {
    if (!message && !file) {
      return;
    }

    let newMessage: Message = {
      avatar: '',
      name: 'You',
    };

    if (message) {
      newMessage = {
        ...newMessage,
        text: message,
      };
    }
    
    if (file) {
      newMessage = {
        ...newMessage,
        file,
      };
      sendFileToServer(file);
      setFile(null);
      setFileUploadStatus('File uploaded successfully');
    }

    socket.emit('chat message', { room: offerId, message, senderId: socket.id });
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
  };

  const sendFileToServer = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result as ArrayBuffer;
      socket.emit('file upload', { room: offerId, fileData, fileName: file.name });
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    socket.on('chat message', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('file message', (fileMessage: Message) => {
      const { fileName, downloadLink } = fileMessage;
      const newMessage: Message = { ...fileMessage }; // Create a new message with the file data
      newMessage.text = `File: ${fileName}`; // Display the filename as part of the message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('chat message');
      socket.off('file message');
    };
  }, []);

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <Avatar src={msg.avatar}>{msg.name}</Avatar>
            {msg.text && <div>{msg.text}</div>}
            {msg.fileName && msg.downloadLink && ( // Check if the message has a fileName and downloadLink
              <div>
                <a href={'http://localhost:8080'+msg.downloadLink} download={msg.fileName}>
                  {msg.fileName}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      <Paper shadow="xs">
        <Group position="apart">
          <TextInput value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." />
          <Button variant="light" onClick={() => inputFile.current?.click()}>Upload File</Button>
          <input ref={inputFile} type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
        </Group>
        <div>{fileUploadStatus}</div>
        <Button onClick={handleSendMessage}>Send</Button>
        <Button onClick={handleJoinRoom} disabled={!offerId}>Join Room</Button>
      </Paper>
    </div>
  );
};

export default ChatComponent;
