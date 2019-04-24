import React from "react"
import axios from "axios"

export default class AddSalesperson extends React.Component {
  state = {
    name: '',
  }

  submit = event => {
    event.preventDefault();

    axios.post('/.netlify/functions/addSalesperson', { name: this.state.name })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      name: ''
    });
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    });
  }

  render(){
    return (
      <form onSubmit={this.submit}>
        <input
          placeholder="Salesperson's name?"
          name='name'
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <input type="submit" value="Add" />
      </form>
    );
  }
}
