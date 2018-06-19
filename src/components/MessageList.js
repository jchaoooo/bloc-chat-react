import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      messages: []
    }

    this.messagesRef = this.props.firebase.database().ref("messages");
    this.handleChange=this.handleChange.bind(this);
    this.createMessage=this.createMessage.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const messages = snapshot.val();
      messages.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( messages ) });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: 'user',
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    })
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    })
    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.messages) return
    this.roomsRef.push({ name: this.state.messages })
    this.setState({ messages: ''})
  }

  render() {
    return (
      <div className="message-list">
        <section>
          <h1>Messages</h1>
          {this.state.messages.map((message) =>
            <li key={message.key}>
              {message.content}
              </li>
            )}
        </section>
        <div id="new-message">
          <form onSubmit={ (e) => this.createMessage(e) }>
            <p>New Message</p>
            <label>
              New Message:
              <input type="text" value={this.state.content} onChange={ (e) => this.handleChange(e) } placeholder="Enter Message" />
            </label>
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default MessageList
