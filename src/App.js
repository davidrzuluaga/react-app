import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      fruitName: "",
      fruits: [],
      newApple: false,
    }
    
    axios.get("https://davidrzuluaga.com/Jaguar-XE/fruits.json")
      .then(response => {
        this.setState({
          fruits: response.data.fruits
        })
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    const Shop = (props) => <p key={props.fru}>Le tengo la {props.fru} a {props.price}</p>;
    return (
      <div>
        <h1>Mi primera aplicación</h1>
          {this.state.fruits.map(fruit =>
            <Shop fru = {fruit} price = "2" />
            )}
        <input type="text" value={this.state.fruitName} disabled= {this.state.newApple} onChange={this.updateName.bind(this)}></input>
        <Button variant="primary" onClick={this.addOne.bind(this)}>add a new {this.state.fruitName}</Button>
        <Button variant="primary" onClick={this.modOne.bind(this)}>edit {this.state.fruitName} for Sandia</Button>
        <Button variant="primary" onClick={this.delOne.bind(this)}>delete {this.state.fruitName}</Button>
      <div>
        <label>
          <input type="checkbox" checked={this.state.newApple} onClick = {this.checkNewApple.bind(this)} />Add {this.state.fruits[0]}
        </label>
      </div>
        <p>Esta es mi primera aplicación en React, está padrísimo!</p>
      </div>
    );
  }

  checkNewApple(event){
    var fruitName
    this.state.newApple ? fruitName = "" : fruitName = this.state.fruits[0];
    this.setState({
      newApple: event.target.checked,
      fruitName: fruitName,
    })
  }

  updateName(event){
    this.setState({
      fruitName: event.target.value
    })
  }

  addOne (){
    this.setState({
      fruits: this.state.fruits.concat(this.state.fruitName)
    })
    console.log(this.state.fruits)
  }
  
  modOne (){
    const index = this.state.fruits.findIndex(fruit =>
      fruit === this.state.fruitName
      );
    this.setState({
      fruits: this.state.fruits.map((fruit, i) =>
        index === i ? "Sandia" : fruit
      )
    });
  }

  delOne (){
    const index = this.state.fruits.findIndex(task =>
      task === this.state.fruitName
      );
    this.setState({
      fruits: this.state.fruits.filter((fruit, i) =>
        index !== i
      )
    })
  }
  
}

export default App;
