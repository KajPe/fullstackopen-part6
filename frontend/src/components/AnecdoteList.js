import React from 'react'
import PropTypes from 'prop-types'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationInfo } from './../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  voteforit = (anecdote) => {
    this.context.store.dispatch(
      anecdoteVote(anecdote.id)
    )
    this.context.store.dispatch(
      notificationInfo('Voted for anecdote : "' + anecdote.content + '"')
    )
  }

  render() {
    const anecdotes = this.context.store.getState().anecdote
    const srch = this.context.store.getState().search

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.context.store} />
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

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
