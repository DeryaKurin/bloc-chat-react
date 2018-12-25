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
    this.setState({newRoomName: e.target.value});
    this.roomsRef.push({
      name: newRoomName
    });
  }


  render() {
    return (
      <section>
      <h1>Bloc Chat</h1>
        <section className="room-list">
          {
            this.state.rooms.map((room, index) =>
                  <div key={index}>
                    <h3>{room.name}</h3>
                  </div>
              )
          }
         </section>
         <form onsubmit={(e) => this.createRoom(e)} >
           <label>
             Room Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
       </section>
      );
     }
   }

export default RoomList;
