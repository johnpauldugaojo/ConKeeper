import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alertcontext/AlertContext';
import AuthContext from '../../context/authcontext/AuthContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext; //Pull out the setAlert function
  const { register, error, clearErrors, isAuthenticated } = authContext; //Pull out the register function

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User is already exist') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); //useEffect make a function

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user; //destructuring

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='8'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='8'
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary btn-block'
          value='Register'
        />
      </form>
    </div>
  );
};

export default Register;
