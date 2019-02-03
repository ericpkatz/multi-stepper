import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, loadUsers, destroyUser } from './store';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import Users from './Users';
import Nav from './Nav';
import UserUpdate from './UserUpdate';
import UserCreate from './UserCreate';

class App extends Component{
  componentDidMount(){
    this.props.init();
  }
  render(){
    const { users } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Route component={ ({ location })=> <Nav path={ location.pathname }/> } />
            <Switch>
              <Route exact path='/users' component={ Users } /> 
              <Route path='/users/create/:step?/:data?' component={ UserCreate } /> 
              <Route path='/users/:id' component={ UserUpdate } /> 
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> dispatch(loadUsers()),
  };
};

const mapStateToProps = ({ users })=> {
  return {
    users 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
