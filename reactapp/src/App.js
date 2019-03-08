import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {


  state = {
    list: []
  }



  postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
  }


  fetchList = () => {

    this.postData(`http://localhost:8080/createContract`, { divcontent: '<div> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </div>'   })
    .then(data => console.log("Got ans :- ", data)) // JSON-string from `response.json()` call
    .catch(error => console.error("got error:- ", error));

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
