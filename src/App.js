import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
    render () {
      return (
        <div className='App'>
          <header>
            <h1> BLOC CHAT! </h1>
          </header>
          <main>
            <section id="sidebar">
              <RoomList firebase={firebase} />
            </section>
            <section id="main">
              <p>This side will contain main info</p>
            </section>
          </main>
        </div>
      )
    }
  }

  export default App;
