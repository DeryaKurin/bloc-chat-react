import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';


// Initialize Firebase

const config = {
    apiKey: "AIzaSyCHmnCgkF_97qnHYhi6m2MJHJq5z6wshHI",
    authDomain: "bloc-live-chat-react.firebaseapp.com",
    databaseURL: "https://bloc-live-chat-react.firebaseio.com",
    projectId: "bloc-live-chat-react",
    storageBucket: "bloc-live-chat-react.appspot.com",
    messagingSenderId: "880406421980"
};

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase={ firebase } />
      </div>
    );
  }
}

export default App;
