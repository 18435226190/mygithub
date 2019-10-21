import React from 'react';
import './App.css';
import Router from './router/public'
import axios from 'axios'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div id="boss">
        <Router/>
      </div>
    )
  }

}



export default App;
