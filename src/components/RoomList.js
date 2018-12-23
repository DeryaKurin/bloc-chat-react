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
      const rooms = snapshot.val();
      rooms.key = snapshot.key;
      console.log("Added room: " + rooms.key);
      this.setState({ rooms: this.state.rooms.concat( rooms ) })
    });
  }

  render() {
    return (
      <section className="room-list">
            {this.state.rooms.map( room =>
                <li key={room.key} >
                  <button className="room-name">{room.name}</button>
                </li>
            )}
       </section>
      );
     }
   }

export default RoomList;
