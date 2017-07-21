import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

const io = require('socket.io-client')
const socket = io()

class AxistChat extends Component {
  render() {
    const steps=[
      {
        id: '1',
        message: 'What is your name?',
        trigger: '2',
      },
      {
        id: '2',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        message: 'Hi {previousValue}, nice to meet you!',
        trigger: '2',
      }
    ];

    return (
      <div>
        <ChatBot floating steps={steps} />
      </div>
    );
  }
}

export default AxistChat;
