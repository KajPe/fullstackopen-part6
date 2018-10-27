import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationInfo } from './../reducers/notificationReducer'

class AnecdoteFormBase extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.anecdoteCreation(content)
    this.props.notificationInfo('Created new anecdote : "' + content + '"', 10)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

const AnecdoteForm = connect(
  null,
  { anecdoteCreation, notificationInfo }
)(AnecdoteFormBase)

export default AnecdoteForm
