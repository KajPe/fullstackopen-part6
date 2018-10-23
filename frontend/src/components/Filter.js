import React from 'react'
import { connect } from 'react-redux'
import { searchSet } from './../reducers/searchReducer'

class FilterBase extends React.Component {
  handleChange = (event) => {
    this.props.searchSet(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input value={this.props.search} onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}

const Filter = connect(
  mapStateToProps,
  { searchSet }
)(FilterBase)

export default Filter
