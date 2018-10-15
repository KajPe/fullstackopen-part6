import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationInfo } from './../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  voteforit = (anecdote) => {
    this.props.store.dispatch(
      anecdoteVote(anecdote.id)
    )
    this.props.store.dispatch(
      notificationInfo('Voted for anecdote : "' + anecdote.content + '"')
    )
  }

  render() {
    const anecdotes = this.props.store.getState().anecdote
    const srch = this.props.store.getState().search

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {
          anecdotes
            .filter(anec => anec.content.toLowerCase().includes(srch.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() =>
                    this.voteforit(anecdote)
                  }>
                    vote
                  </button>
                </div>
              </div>
            )
        }
      </div>
    )
  }
}

export default AnecdoteList
