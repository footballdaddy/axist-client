import React, { Component } from 'react';
import ChatBot from '../components/chatbot/ChatBot';
import _ from 'underscore';
import moment from 'moment';

const io = require('socket.io-client')
const socket = io.connect('http://139.59.233.76:8080')

class AxistChat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      steps : [
        {
          id: 'init',
          message: 'Hi, I am Axist your personal assistive chatbot. What can I do for you?',
          trigger: 'answer'
        },
        {
          id: 'answer',
          user: true,
          validator: (value) => this.sendAnswer(value),
          trigger: 'answer'
        }
      ],
      last_step_id: 'init',
      user : {},
      is_anonymous : true
    };

    socket.on('conversation', (receivedMessage) => this.receiveMessage(receivedMessage));
  }

  componentDidUpdate() {
    // socket.on('conversation', (receivedMessage) => this.receiveMessage(receivedMessage));
  }

  updateSteps(newStep) {
    var self = this;
    var steps = this.state.steps;

    steps.push(newStep);

    var updatedSteps = _.map(
      steps,
      function(step) {
        console.log('old last step id ', self.state.last_step_id);

        if (step.id === self.state.last_step_id) {
          return _.extend(step, {
            trigger: newStep.id
          });
        } else {
          return step;
        }
      }
    );

    this.setState({
      steps: updatedSteps,
      last_step_id: newStep.id
    });
  }

  sendAnswer(message) {
    console.log('sendAnswer ', message);

    socket.emit('conversation', {
      user_id: 'kanya',
      message: message
    });

    var newStep = {
      id: moment().format('DDMMYYYYHHmmssSSS'),
      user: true,
      message: message,
      trigger: 'answer'
    };

    this.updateSteps(newStep);

    return true;
  }

  receiveMessage(receivedMessage) {
    console.log('receivedMessage ', receivedMessage);

    var newStep = {
      id: receivedMessage.message.id,
      message: receivedMessage.message.response,
      trigger: 'answer'
    };

    this.updateSteps(newStep);
  }

  render() {
    console.log('state steps ', this.state.steps);

    return (
      <div>
        <ChatBot floating steps={ this.state.steps }/>
      </div>
    );
  }
}

export default AxistChat;
