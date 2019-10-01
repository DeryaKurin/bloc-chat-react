import React, {Component} from 'react';
import './messagelist.css';
import { ListGroup, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';


class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessageContent: ''
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
    this.setState({ newMessageContent: e.target.value });
  }

  createMessage(e) {
    if (!this.state.newMessageContent) {
      return
    }
    this.messagesRef.push({
      content: this.state.newMessageContent,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      userName: this.props.userName
    });
    this.setState({ newMessageContent: '' });
  }

  render() {
    console.log(this.state.messages.length);
    return (
      <section className="messages">
      {
      (this.props.activeRoom === "") ?
          <div></div> :

            <div>
              <h2>{this.props.activeRoom.name}</h2>
              <ListGroup>
              <div className="message-list">
              {
              this.state.messages.filter((message, index) =>
              this.props.activeRoom.key === message.roomId).map((message, index) =>

               <ListGroup.Item className="messageId"
                    key = {index}>
                    <div className="user-style">
                      {message.userName}
                    </div>
                    <div className="list-item">
                      <div>
                      {message.content}
                      </div>
                      <Moment element="span" format="MM/DD/YY hh:mm A" className="sent-at">
  	  	               { message.sentAt }
  	                	</Moment>
                    </div>
               </ListGroup.Item>
             )
             }
             </div>
             </ListGroup>
           <form id="create-message"
             onSubmit={(e) => { e.preventDefault();
             this.createMessage(this.state.newMessageContent)}} >
             <label>
              <input type="text" style={{width:"20rem"}} name="newMessage" value={this.state.newMessageContent} onChange={this.handleChange.bind(this)} placeholder="Write a message here" />
             </label>
             <Button variant="info" type="submit">Send</Button>
           </form>
           </div>
         }
      </section>
    );
  }
}


export default MessageList;
