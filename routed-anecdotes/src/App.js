import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Col, Row, Grid } from 'react-bootstrap'
import { FormGroup, Form, ControlLabel, FormControl, Button, Alert, Panel } from 'react-bootstrap'

const selectedMenu = {
  fontWeight: 'bold',
  color: 'blue',
  borderRadius: '5px',
  backgroundColor: 'white'
}

const menuBackground = {
  backgroundColor: 'blue',
  borderRadius: '10px',
  padding: '8px',
  height: '44px'
}

const menuStyle = {
  width: '200px',
  padding: '2px 10px 3px 10px',
  fontSize: '20px',
  textDecorationLine: 'none',
  color: 'yellow'
}

const menuDiv = {
  width: '140px',
  float:'left'
}

const footerStyle = {
  textAlign: 'center',
  padding: '5px',
  marginBottom: '15px',
  borderRadius: '10px',
  boxShadow: '0 0 20px gray'
}

const Menu = () => (
  <div style={menuBackground}>    
    <div style={menuDiv}>
      <NavLink style={menuStyle} exact to='/' activeStyle={selectedMenu} >Anecdotes</NavLink>
    </div>
    <div style={menuDiv}>
      <NavLink style={menuStyle} exact to='/create' activeStyle={selectedMenu}>Create New</NavLink>
    </div>
    <div style={menuDiv}>
      <NavLink style={menuStyle} exact to='/about' activeStyle={selectedMenu}>About</NavLink>
    </div>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <Panel style={{ marginTop: '20px' }}>
      <Panel.Heading>
        <Panel.Title>{anecdote.content}</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
      <ul>
        <li>Has {anecdote.votes} votes</li>
        <li>Author: {anecdote.author}</li>
       <li>For more info see: <a href={anecdote.info}>{anecdote.info}</a></li>
      </ul>
      </Panel.Body>
    </Panel>
  </div>
)

const About = () => (
  <div>
    <br />
    <Grid>
      <Row className="show-grid">
        <Col xs={6} xsOffset={1}>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>
          <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>
          <br />
          <br />
          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Col>
        <Col xs={4}><img alt="Richard Stallman" src="/Richard_Stallman.jpg" /></Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <footer className="navbar-fixed-bottom">
    <Grid>
      <Row className="show-grid">
        <Col style={footerStyle}>
          Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
          See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
        </Col>
      </Row>
    </Grid>
  </footer>
)

const Notification = ({ infomessage, clearNotification }) => {
  if (infomessage !== null) {
    setTimeout(() => {
      clearNotification()
    }, 10000)
    return (
      <div>
        <br />
        <Alert color='success'>
          {infomessage}
        </Alert>
      </div>
    )
  } else {
    return null
  }
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>Create a new anecdote</h2>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Content
            </Col>
            <Col sm={10}>
              <FormControl type="text" name='content' value={this.state.content} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Author
            </Col>
            <Col sm={10}>
              <FormControl type="text" name='author' value={this.state.author} onChange={this.handleChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              URL for more info
            </Col>
            <Col sm={10}>
              <FormControl type="text" name='info' value={this.state.info} onChange={this.handleChange} />
            </Col>
            </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" bsStyle="success">Create</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: null
    } 
  }

  addNew = (anecdote, history) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: 'A new anecdote "' + anecdote.content + '" has been created.'
    })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  clearNotification = () => {
    this.setState({
      notification: null
    })
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification infomessage={this.state.notification} clearNotification={this.clearNotification}/>
            <Route exact path='/' render={() =>
              <AnecdoteList anecdotes={this.state.anecdotes} />
            } />
            <Route exact path="/anecdotes/:id" render={({match}) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Route exact path='/about' render={() => <About />} />
            <Route exact path='/create' render={ ({history}) =>
              <CreateNew history={history} addNew={this.addNew}/>
            } />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
