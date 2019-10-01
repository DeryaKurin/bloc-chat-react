import React, { Component } from 'react';
import * as firebase from 'firebase';
import speechbubble from './speechbubble.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
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
      user: null,
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
      <header className="App-header">
        <nav>
          <ul>
            <li id="logo-name"><img src={speechbubble} style={{height:"4.6rem"}} className="App-logo" alt="logo" /><h1 className="App-title">Chit Chat</h1></li>
            <li id="user-name">
              <User
              firebase = { firebase }
              setUser = { (user) => this.setUser(user) }
              user = { this.state.user }
              />
            </li>
          </ul>
        </nav>
      </header>
      <Container>
        <Row className="show-grid">
          <Col className="Clearfix" xs = {12} md lg = {5}>
            <RoomList
              firebase = { firebase }
              setRoom = { (room) => this.setRoom(room) }
            />
          </Col>
          <Col className="Clearfix"xs = {12} md lg = {7}>
            <MessageList
              firebase = { firebase }
              activeRoom = { this.state.activeRoom }
              userName = { this.state.user ? this.state.user.displayName : "Guest" }
            />
          </Col>
        </Row>
       </Container>
      </div>
    );
  }
}

export default App;
