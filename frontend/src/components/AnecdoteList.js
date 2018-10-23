import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationInfo } from './../reducers/notificationReducer'
import Filter from './Filter'
import anecdotesService from '../services/anecdotes'

const AnecdotesToShow = ( anecdotes, search ) => {
  return anecdotes
    .filter(anec => anec.content.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
}

class AnecdoteListBase extends React.Component {
  voteforit = async (anecdote) => {
    const NewAnecdote = { ...anecdote, votes: anecdote.votes+1 }
    const resp = await anecdotesService.update(NewAnecdote)
    this.props.anecdoteVote(resp)
    this.props.notificationInfo('Voted for anecdote : "' + resp.content + '"')
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {
          this.props.anecdotes
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
    anecdotes: AnecdotesToShow(state.anecdote, state.search)
  }
}

const AnecdoteList = connect(
  mapStateToProps,
  { anecdoteVote, notificationInfo }
)(AnecdoteListBase)

export default AnecdoteList
