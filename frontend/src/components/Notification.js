import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const info = this.props.store.getState().notification

    return (
      <div style={style}>
        {info}
      </div>
    )
  }
}

export default Notification
