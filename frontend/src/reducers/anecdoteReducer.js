
const getId = () => (100000*Math.random()).toFixed(0)

const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data
  case 'VOTE': {
    const old = store.filter(a => a.id !==action.data.id)
    const voted = store.find(a => a.id === action.data.id)
    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  case 'CREATE':
    return [...store, { content: action.data.content, id: getId(), votes:0 }]
  default:
    return store
  }
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    data: { content }
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export default anecdoteReducer