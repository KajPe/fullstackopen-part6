import React from 'react'
import { notificationClear } from './../reducers/notificationReducer'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const info = this.props.store.getState().notification

    if (info.length > 0) {
      // We have a info, show it for 5 seconds
      setTimeout(() => {
        this.props.store.dispatch(
          notificationClear()
        )
      }, 5000)

      return (
        <div style={style}>
          {info}
        </div>
      )
    }

    // info is empty, don't show anything
    return null
  }
}

export default Notification
