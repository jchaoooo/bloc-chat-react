import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  deleteRoom(roomKey) {
    this.roomsRef.update({
      [roomKey]: null
    });
  }

  renameRoom(roomKey) {
    let updatedRoom = {key: this.props.activeRoom.key,
                      name: window.prompt("Please enter a new room name")};
    const newRoomName = this.props.firebase.database().ref('rooms/' + roomKey);
    newRoomName.update({name: updatedRoom.name})
  }


  render() {
      return (
        <div className="room-list">
          <section>
            <ul className="room-names">
              {this.state.rooms.map((room, index) => {
                return (
                <li key={room.key}
                  onClick={() => this.props.setActiveRoom(room)}>
                  <p>
                    {room.name}
                    <button onClick={ () => this.deleteRoom(room.key) }>Delete</button>
                    <button onClick={ () => this.renameRoom(room.key) }>Rename</button>
                  </p>
                </li>
                )
              })}
            </ul>
          </section>
          <div id="new-room">
            <form onSubmit={ (e) => this.handleSubmit(e) }>
              <label>
                Room Name:
                <input
                  type="text"
                  placeholder="enter room name"
                  value={this.state.newRoomName}
                  onChange={ (e) => this.handleChange(e) }/>
              </label>
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      )
    }
  }

export default RoomList;
