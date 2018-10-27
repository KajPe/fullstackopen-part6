
const initialInfo = ''

const notificationReducer = (store = initialInfo, action) => {
  switch (action.type) {
  case 'INFO':
    return action.data.content
  case 'CLEAR':
    return null
  default:
    return store
  }
}

export const notificationInfo = (content, showtime=5) => {
  return async (dispatch) => {
    dispatch({
      type: 'INFO',
      data: { content }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, showtime*1000)
  }
}

export const notificationClear = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR'
    })
  }
}

export default notificationReducer