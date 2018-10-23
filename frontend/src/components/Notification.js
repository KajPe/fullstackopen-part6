import React from 'react'
import PropTypes from 'prop-types'
import { notificationClear } from './../reducers/notificationReducer'

class Notification extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const info = this.context.store.getState().notification

    if (info.length > 0) {
      // We have a info, show it for 5 seconds
      setTimeout(() => {
        this.context.store.dispatch(
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


Notification.contextTypes = {
  store: PropTypes.object
}

export default Notification
