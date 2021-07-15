import React, { Component } from 'react'

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      desc: '',
      fruit: 'lime'
    }
  }
  inputName = e => {
    this.setState({
      value: e.target.value
    })
  }
  textareaInput = e => {
    this.setState({
      desc: e.target.value
    })
  }
  selectChange = e => {
    console.log(e.target.value)
    this.setState({
      fruit: e.target.value
    })
  }
  handleSubmit = e => {
    // 阻止表单的submit的默认事件
    e.preventDefault()
    console.log(this.state)
  }
  render() {
    return (
      <form>
        <label>
          姓名：
          <input type='text' value={this.state.value} onChange={this.inputName} />
        </label>
        <br />
        <label>
          个人简介：
          <textarea type='text' value={this.state.desc} onChange={this.textareaInput} />
        </label>
        <br />
        <select value={this.state.fruit} onChange={this.selectChange}>
          <option value='grapefruit'>葡萄柚</option>
          <option value='lime'>酸橙</option>
          <option value='coconut'>椰子</option>
          <option value='mango'>芒果</option>
        </select>
        <br />
        <input type='submit' value='提交' onClick={this.handleSubmit} />
      </form>
    )
  }
}

export default index
