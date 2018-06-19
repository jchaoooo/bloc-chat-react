import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms')
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newRoomName) return
    this.roomsRef.push({ name: this.state.newRoomName })
    this.setState({ newRoomName: ''})
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }

  render() {
      return (
        <div className="room-list">
          <section>
            <h1>Room List</h1>
            {this.state.rooms.map((room, index) =>
              <li key={room.key} onClick={ (e) => this.selectRoom(room,e) }>
                {room.name}
              </li>
          )}
          </section>
          <div id="new-room">
            <form onSubmit={ (e) => this.handleSubmit(e) }>
              <p>Add New Room</p>
              <label>
                Room Name:
                <input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) }/>
              </label>
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      )
    }
  }

export default RoomList;
