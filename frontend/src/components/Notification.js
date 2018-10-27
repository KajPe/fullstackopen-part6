import React from 'react'
import { connect } from 'react-redux'

class NotificationBase extends React.Component {
  render() {
    if (this.props.notification) {
      const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
      return (
        <div style={style}>
          {this.props.notification}
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
  mapStateToProps
)(NotificationBase)

export default Notification
