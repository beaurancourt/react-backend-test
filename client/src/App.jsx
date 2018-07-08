import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: [{id: "1", name: "Beau"}]};
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({users: users}));
  }

  render() {
    return (
      <ul>
        {
          this.state.users.map((user) => (
            <li key={user.id}><Link to={this.props.match.url + "/" + user.id}>{user.name}</Link></li>
          ))
        }
      </ul>
    );
  }
}

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: "", name: ""};
  }

  componentDidMount() {
    fetch('/api/users/' + this.props.match.params.id)
      .then(res => res.json())
      .then(user => this.setState(user))
  }

  render() {
    return (
      <div>Name: {this.state.name}</div>
    );
  }
}

class BasicExample extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Home}/>
          <Route exact path="/users" component={Users}/>
          <Route exact path="/users/:id" component={User}/>
        </div>
      </Router>
    );
  }
}
export default BasicExample
