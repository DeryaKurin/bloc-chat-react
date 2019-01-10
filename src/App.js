import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
    this.state = {
      activeRoom: '',
      user: null
    }
    this.setRoom = this.setRoom.bind(this);
    this.setUser =this.setUser.bind(this);
  }

  setRoom(room) {
    this.setState({ activeRoom: room });
    console.log(this.state.activeRoom)
  }

  setUser(user) {
    this.setState({ user: user });
  }



  render() {
    return (
      <div className="App">
        <RoomList
        firebase = { firebase }
        setRoom = { (room) => this.setRoom(room) }
         />
        <MessageList
        firebase = { firebase }
        activeRoom = { this.state.activeRoom }
        userName = ''
         />
         <User
         firebase = { firebase }
         setUser = { (user) => this.setUser(user) }
         user = { this.state.user }
         />
       </div>
    );
  }
}

export default App;
