import React, { Component } from 'react'
import Calculator from './components/Calculator'

class index extends Component {
  render() {
    return (
      <div>
        <Calculator scale='c' />
        <Calculator scale='f' />
      </div>
    )
  }
}

export default index
