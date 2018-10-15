
const initialInfo = 'Hello from notification'

const notificationReducer = (store = initialInfo, action) => {
  switch (action.type) {
  case 'INFO':
    return action.data.content
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
export default notificationReducer