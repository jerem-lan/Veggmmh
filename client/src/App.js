import React, { Component } from 'react';

import './styles/App.css';

// import Header from './components/Header'

class App extends Component {
  state = {
    username: this.props.match.params.username
  }
  render() {
    return (
      <div className="Content">
        {/* <Header/> */}
        <h1>Bonjour {this.state.username}</h1>
      </div>
    );
  }
}

export default App;
