import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationInfo } from './../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteListBase extends React.Component {
  voteforit = (anecdote) => {
    this.props.anecdoteVote(anecdote.id)
    this.props.notificationInfo('Voted for anecdote : "' + anecdote.content + '"')
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {
          this.props.anecdote
            .filter(anec => anec.content.toLowerCase().includes(this.props.search.toLowerCase()))
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

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    search: state.search
  }
}

const AnecdoteList = connect(
  mapStateToProps,
  { anecdoteVote, notificationInfo }
)(AnecdoteListBase)

export default AnecdoteList
