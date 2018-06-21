import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

var config = {
  apiKey: "AIzaSyDJ83bXV_8q2QLeQ4L1HzR8ar1Qos9rlTs",
  authDomain: "bloc-chat-b59e4.firebaseapp.com",
  databaseURL: "https://bloc-chat-b59e4.firebaseio.com",
  projectId: "bloc-chat-b59e4",
  storageBucket: "bloc-chat-b59e4.appspot.com",
  messagingSenderId: "72364855186"
};
  firebase.initializeApp(config);

  class App extends Component {
    constructor(props) {
      super(props);

      this.state={
        activeRoom: '',
        activeUser: ''
      }

      this.setActiveRoom = this.setActiveRoom.bind(this);
      this.setUser = this.setUser.bind(this);

    }

    setUser(user) {
      this.setState({ activeUser: user })
    }

    setActiveRoom(room) {
      this.setState({ activeRoom: room })
      console.log(this.state.activeRoom)
    }


    render () {
      return (
        <div className='App'>
          <header>
            <h1> BLOC CHAT! </h1>
          </header>
          <main>
            <section id="sidebar">
              <RoomList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
                setActiveRoom={this.setActiveRoom}
              />
            </section>
            <section id="main">
              <User
                firebase={firebase}
                setUser={this.setUser}
                user={this.state.activeUser}
              />
              <MessageList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
              />
            </section>
          </main>
        </div>
      )
    }
  }

  export default App;
