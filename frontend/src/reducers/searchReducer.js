
const initialSearch = ''

const searchReducer = (store = initialSearch, action) => {
  switch (action.type) {
  case 'SEARCH':
    return action.data.search
  default:
    return store
  }
}

export const searchSet = (search) => {
  return {
    type: 'SEARCH',
    data: { search }
  }
}

export default searchReducer