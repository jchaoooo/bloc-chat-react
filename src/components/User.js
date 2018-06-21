import React, { Component } from 'react';

class User extends Component  {
  constructor(props) {
    super(props)

    this.state = {
      user: ''
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    })
  }

  render() {
    const currentUser = this.props.user === null ? "Guest" : this.props.user.displayName

    return (
      <div>
        <span>Logged in as: {currentUser}</span>
        <button type="button" className="sign-in" onClick={this.signIn}>
          Sign-in
        </button>
        <button type="button" className="sign-off" onClick={this.signOff}>
          Logout
        </button>
      </div>
    )
  }
}

export default User
