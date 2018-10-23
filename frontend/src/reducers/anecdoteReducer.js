import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  case 'VOTE': {
    const old = store.filter(a => a.id !==action.data.newAnecdote.id)
    return [...old, action.data.newAnecdote ]
  }
  case 'CREATE':
    return [...store, {
      content: action.data.newAnecdote.content,
      id: action.data.newAnecdote.id,
      votes: action.data.newAnecdote.votes
    }]
  default:
    return store
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: { newAnecdote }
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: { newAnecdote }
    })
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