import React, { Component } from 'react'

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.tick()
    }, 1000)
  }
  tick() {
    this.setState({
      date: new Date()
    })
  }
  componentWillUnmount() {
    clearInterval(this.timerId)
  }
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

export default index
