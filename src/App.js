import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
  constructor(props) {
    super(props);
    this.state={
      activeRoom: ''
    }
    this.setRoom = this.setRoom.bind(this);
  }

  setRoom(roomId) {
    this.setState({ activeRoom: roomId})
    console.log(this.state.activeRoom)
  }



  render() {
    return (
      <div className="App">
        <RoomList
        firebase = { firebase }
        setRoom = { (e) => this.setRoom(e) }
         />
        <MessageList
        firebase = { firebase }
        activeRoomId = { this.state.activeRoom }
         />
      </div>
    );
  }
}

export default App;
