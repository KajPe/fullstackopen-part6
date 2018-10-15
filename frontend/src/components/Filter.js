import React from 'react'
import { searchSet } from './../reducers/searchReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.store.dispatch(
      searchSet(event.target.value)
    )
  }

  render() {
    const style = {
      marginBottom: 10
    }

    const val = this.props.store.getState().search

    return (
      <div style={style}>
        filter <input value={val} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Filter
