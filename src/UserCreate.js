import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { createUser } from './store';

const UserCreateName = ({ name, onChange })=>  (
  <div>
    Name
    <input type='text' name='name' onChange={ onChange } value={ name } />
  </div>
);

const UserCreatePassword = ({ password, onChange })=> (
  <div>
    Password
    <input type='text' name='password' onChange={ onChange } value={ password }/>
  </div>
);

const UserCreateAge = ({ age, onChange })=> (
  <div>
    Age
    <input type='text' name='age' value={ age } onChange={ onChange }/>
  </div>
);


class UserCreate extends Component{
  state = { error : ''}
  setError(error){
    this.setState({ error });
  }
  onCreate = ()=> {
    this.props.createUser(this.props.formData, this.props.history)
      .catch(ex => this.setError({ error: ex.response}));
  }
  render(){
    const {formData, step, history, createUser} = this.props;
      const steps = [1, 2, 3];
      const goNext = ()=> history.push(nextURL());
      const goPrevious = ()=> history.push(previousURL());
      const nextURL = ()=> {
        if(step !== steps.slice(-1)[0]){
          return `/users/create/${step + 1}/${JSON.stringify(formData)}`;
        }
      }
      const previousURL = ()=> {
        if(step !== steps[0]){
          return `/users/create/${step - 1}/${JSON.stringify(formData)}`;
        }
      }
      const onChange = (ev)=> {
        const _formData = {...formData, [ev.target.name]: ev.target.value }
        const url = `/users/create/${step}/${JSON.stringify(_formData)}`;
        history.replace(url);
      }
      const { name, age, password } = formData;
      const disabled = !name || !age || !password;
      const { error } = this.state;
      const { onCreate } = this;
      return (
        <div>
          <ul>
          {
            steps.map(_step => (
              <li key={_step} style={{ fontWeight: _step == step ? 'bold': ''}}>
                <Link to={`/users/create/${_step}/${JSON.stringify(formData)}`}>
                { _step }
                </Link>
              </li>
            ))
          }
          </ul>
        <div style={{border: 'solid 1px black'}}>
          { step === 1 && <UserCreateName onChange={ onChange } name={ name }/> }
          { step === 2 && <UserCreateAge onChange={ onChange } age={ age }/> }
          { step === 3 && <UserCreatePassword onChange={ onChange } password={ password }/> }
        </div>
          {
            previousURL() && <button onClick={ goPrevious } >Previous</button>
          }
          {
            nextURL() && <button onClick={ goNext }>Next</button>
          }
          <button disabled={ disabled } onClick={onCreate}>Save</button>
          {
            error && (JSON.stringify(error)) 
          }
        </div>
      );
  }
}

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    createUser: (user)=>dispatch(createUser(user, history))
  }
}
const mapStateToProps = ({}, { location, history, match })=> {
  const defaults = {
    name: '',
    password: '',
    age: ''
  };
  return {
    formData: match.params.data ? {...defaults, ...JSON.parse(match.params.data)} : defaults,
    location,
    step: match.params.step*1
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
