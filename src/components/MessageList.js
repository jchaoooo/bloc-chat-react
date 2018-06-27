import React, { Component } from 'react';
import './../styles/MessageList.css';

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
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
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
    const currentUser = this.props.user === null ? "Guest" : this.props.user.displayName;
    this.setState({
      username: currentUser,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    })
  }

  createMessage(e) {
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.props.activeRoom.key
    })
    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    })
  }

  handleMessageSubmit(e) {
    e.preventDefault();
    this.createMessage();
    this.setState({ content: "" });
  }

  formatTime(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = ('0' + date.getMinutes()).slice(-2);
    const sec = date.getSeconds();
    const timestamp = month + ' ' + day + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return timestamp;
  }

  deleteMessage(messageKey) {
    const deleteMessage = this.props.firebase.database().ref('messages/' + messageKey);
    deleteMessage.remove();
  }

  render() {
    return (
      <div className="message-list">
        <h2 className="room-name">{this.props.activeRoom ? this.props.activeRoom.name : 'Please select a room' }</h2>
        <section className="message-group">
          <h1>Messages</h1>
          {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
            <div key={message.key} className="messages">
              <p id="username">Username: {message.username}</p>
              <p id="content">Message: {message.content}
                <button onClick={ () => this.deleteMessage(message.key) }>Delete Message</button>
              </p>
              <p id="timestamp">Timestamp: {this.formatTime(message.sentAt)}</p>
            </div>
            )}
        </section>
        <div id="new-message">
          <form onSubmit={this.handleMessageSubmit}>
            <label>
              New Message:
              <input type="text" value={this.state.content} onChange={this.handleChange} placeholder="Enter Message" />
            </label>
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default MessageList
