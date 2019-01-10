import React, {Component} from 'react';
import './user.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
    });
  }


  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.props.setUser(user);
    });
  }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUser(null);
  });
  }

  render () {
    return (
        this.props.user ?
            <div>
             <p>Username: {this.props.user.displayName}</p>   
              <button onClick={this.signOut}>
                Sign Out
              </button>
             </div>
            :
            <div>
              <p>Username: Guest</p>
              <button onClick={this.signIn}>
                Sign In
              </button>
            </div>
     );
   }
 }







export default User;
