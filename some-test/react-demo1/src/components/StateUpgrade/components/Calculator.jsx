import React, { Component } from 'react'
import BoilingVerdict from './BoilingVerdict'
import { toCelsius, toFahrenheit, tryConvert } from '../utils'

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      temperature: ''
    }
  }
  handleChange = e => {
    this.setState({
      temperature: e.target.value
    })
  }
  render() {
    const temperature = this.state.temperature
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[this.props.scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    )
  }
}

export default Calculator
