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

  handleChange(e) {
    this.setState({ newMessageName: e.target.value });
  }

  render() {
    // const currentUser = (this.props.user === null) ? "Guest" : {this.props.user.displayName };
    return (

      (this.props.activeRoom !== "") ?
          <div className="message-list">
        {
          this.state.messages.filter((message, index) =>

          this.props.activeRoom.key === message.roomId).map((message, index) =>
           <li className="messageId"
                key = {index}>
                {message.content}
           </li>
         )
       }
        </div>
       :  <div>Please Select Your Room</div>

    );
  }
}


export default MessageList;
