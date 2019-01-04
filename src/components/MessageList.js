import React, {Component} from 'react';
import './messagelist.css';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessageName: ''
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message ) })
    });
  }

  createMessage(newMessageName) {
    if (!this.state.newMessageName) {
      return
    }
    this.messagesRef.push({
      username: this.props.username,
      content: this.state.newMessageName,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key,
    });
    this.setState({ newMessageName: '' });
  }


  handleChange(e) {
    this.setState({ newMessageName: e.target.value });
  }

  render() {
    return (
      (this.props.activeRoom !== "") ?
        <div className="message-list" >
        {this.state.messages.filter ((message, index) => this.props.activeRoom.key === message.room).map ((message, index) =>
         <div className="message-id"
           key={index}>
             {message.content}
         </div>
       )}

        </div>
      : <div>Please Select Your Room</div>
    );
  }
}


export default MessageList;
