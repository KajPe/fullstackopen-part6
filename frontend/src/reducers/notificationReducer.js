
const initialInfo = ''

const notificationReducer = (store = initialInfo, action) => {
  switch (action.type) {
  case 'INFO':
    return action.data.content
  case 'CLEAR':
    return ''
  default:
    return store
  }
}

export const notificationInfo = (content) => {
  return {
    type: 'INFO',
    data: { content }
  }
}

export const notificationClear = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationReducer