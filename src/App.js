import React, { Component } from 'react';
import AppContainer from './components/AppContainer/AppContainer';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { addState, } from './redux';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.socket = io('http://localhost:1337/');
  }

  componentDidMount = () => {
    this.socket.on('greeting', (data) => { //4
      console.log("CLIENT > socket.on greeting")
      console.log(data.msg); //5
      this.socket.emit('thankyou', {
        msg: 'client responded'
      });
      this.sendResponse({ type: 'getItem' });
    });
  }

  sendResponse = (event) => {
    this.socket.emit(event.type, { msg: event.data });
    this.socket.on('success', (data) => {
      // this.updateResponse(data.msg);
      console.log('successful response from server')
    });

    this.socket.on('newdata', (data) => {
      // this.setState({
      //   info: data.payload,
      // });
      this.props.addState(data.payload)
    });
  }

  // updateResponse = (data) => {
  //   this.setState({
  //     response: { type: data.status, action: data.action, show: true },
  //   });
  // }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <h1 className='left-align'>Dojo Dossier</h1>
        <AppContainer send={this.sendResponse} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  addState: (value) => dispatch(addState(value)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
