import React, { Component } from 'react';
import './user.css';
import { Button } from 'react-bootstrap';

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
            <div class="header-user">
             <h4>Hello { this.props.user ? `${this.props.user.displayName}!` : "Guest!"}</h4>
              <Button variant="info" onClick={this.props.user ? this.signOut : this.signIn }>
                {
                  this.props.user ? "Sign Out" : "Sign In"
                }
              </Button>
             </div>
     )
   }
 }







export default User;
