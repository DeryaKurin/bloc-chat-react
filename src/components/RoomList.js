import React, {Component} from 'react';
import './roomlist.css';


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
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(e) {
    e.preventDefault();
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
      <h1>Bloc Chat</h1>
        <section className="room-list">
          {
            this.state.rooms.map((room, index) =>
                  <li
                    key={index}
                    onClick = {(room) => this.props.setRoom(room)}  >
                     {room.name}
                  </li>
              )
          }
         </section>
         <form id="create-room"
         onSubmit={(e) => { e.preventDefault();
         this.createRoom(this.state.newRoomName)}} >
           <label>
             Room Name:
            <input type="text" name="newRoomName" value={this.state.newRoomName} onChange={this.handleChange.bind(this)} placeholder="Create a new room" />
          </label>
          <input type="submit" value="Submit" />
        </form>
       </section>
      );
     }
   }

export default RoomList;
