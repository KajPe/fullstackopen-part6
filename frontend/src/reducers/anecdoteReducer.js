import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  case 'VOTE': {
    const old = store.filter(a => a.id !==action.data.anecdote.id)
    return [...old, action.data.anecdote ]
  }
  case 'CREATE':
    return [...store, {
      content: action.data.anecdote.content,
      id: action.data.anecdote.id,
      votes: action.data.anecdote.votes
    }]
  default:
    return store
  }
}

export const anecdoteCreation = (anecdote) => {
  return {
    type: 'CREATE',
    data: { anecdote }
  }
}

export const anecdoteVote = (anecdote) => {
  return {
    type: 'VOTE',
    data: { anecdote }
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer