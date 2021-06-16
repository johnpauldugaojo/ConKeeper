import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/authcontext/AuthContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext); //init AuhtContext
  const contactContext = useContext(ContactContext); //init Contact Context

  const { isAuthenticated, logOut, user } = authContext;
  const { clearContacts } = contactContext;

  const logoutClick = () => {
    logOut();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href='#!' onClick={logoutClick}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guessLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-success'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guessLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Con-Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
