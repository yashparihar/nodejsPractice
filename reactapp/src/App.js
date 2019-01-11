import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {


  state = {
    list: []
  }

  fetchList = () => {

    fetch( "http://localhost:3000/getalldb")
    .then(response => {
      console.log("res:- ", response)
    })
    .catch(err => {
      console.log("err:- ", err)
    })

    fetch( "http://localhost:5985/testdb/_all_docs")
    .then(response => {
      console.log("COUCH res:- ", response)
    })
    .catch(err => {
      console.log("COUCH err:- ", err)
    })

  }

  componentDidMount() {
    this.fetchList();
  }

  insertintoList = () => {
  }

  deletefromlist = () => {

  }

  render() {

    return (
      <div className="App">
        {
          this.state.list.map((val, ind) =>
            <div>
              val
            <span> X </span>
            </div>
          )
        }

        <input type="text" name="txt"></input>
        <button onClick={this.insertintoList}>Insert</button>

      </div>
    );
  }
}

export default App;
