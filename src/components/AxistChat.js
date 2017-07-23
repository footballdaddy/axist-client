import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import _ from 'underscore';

const io = require('socket.io-client');
const socket = io.connect('http://139.59.233.76:8080');

const HEADER_TITLE_CHAT = 'AXIST';
const BOT_LOGO = require('./logo.js');

class AxistBot extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      steps: props.steps,
      response: '...'
    };

    socket.emit('conversation', {
      user_id: 'kanya',
      message: this.state.steps.question.value
    });

    socket.on('conversation', (receivedMessage) => this.receiveMessage(receivedMessage));
  }

  componentDidMount() {
    this.receiveMessage = this.receiveMessage.bind(this);
  }

  receiveMessage(receivedMessage) {
    this.setState(_.extend(this.state, { response: receivedMessage.message.response }));
  }

  render() {
    return (<p> { this.state.response }</p>);
  }
}

class AxistChat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      steps : [
        {
          id: 'greetings',
          message: 'Hi, I am Axist your personal assistive chatbot. What can I do for you?',
          trigger: 'question'
        },
        {
          id: 'question',
          user: true,
          trigger: 'answer'
        },
        {
          id: 'answer',
          asMessage: true,
          component: <AxistBot />,
          trigger: 'question'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <ChatBot floating steps={ this.state.steps } botDelay={ 10 } headerTitle={ HEADER_TITLE_CHAT } botAvatar={ BOT_LOGO } />
      </div>
    );
  }
}

export default AxistChat;
