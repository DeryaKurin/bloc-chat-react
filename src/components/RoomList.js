import React, {Component} from 'react';
import './roomlist.css';
import { Container, Row, Col, Clearfix } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const addedRoom = snapshot.val();
      addedRoom.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( addedRoom ) })
    });
  }

  createRoom(e) {
    if (!this.state.newRoomName) {
      return
    }
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ newRoomName: '' });
  }


  handleChange(e) {
    this.setState({newRoomName: e.target.value });
  }


  render() {
    return (
      <section>
      <Container>
        <Row className="list-background">
          <Col xs={6} md={3}>
            <section className="room-list">
            <h2>Select a Chat Room</h2>
              {
                this.state.rooms.map((room, index) =>
                      <li
                        key={index}
                        onClick = {() => this.props.setRoom(room)} >
                         {room.name}
                      </li>
                )
              }
             </section>
             <section className = "new-room">
               <form id="create-room"
               onSubmit={(e) => { e.preventDefault();
               this.createRoom(this.state.newRoomName)}} >
                 <label>
                  <input type="text" name="newRoomName" value={this.state.newRoomName} onChange={this.handleChange.bind(this)} placeholder="Create a New Room" />
                </label>
                <Button variant="info" type="submit">Add</Button>
              </form>
             </section>
          </Col>
        </Row>
        </Container>
       </section>
      );
     }
   }

export default RoomList;
