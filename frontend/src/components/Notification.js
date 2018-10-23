import React from 'react'
import { connect } from 'react-redux'
import { notificationClear } from './../reducers/notificationReducer'

class NotificationBase extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const info = this.props.notification

    if (info.length > 0) {
      // We have a info, show it for 5 seconds
      setTimeout(() => {
        this.props.notificationClear()
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


const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const Notification = connect(
  mapStateToProps,
  { notificationClear }
)(NotificationBase)

export default Notification
