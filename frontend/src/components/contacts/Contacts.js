import React, { Fragment, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/ContactContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
  // Init Context
  const contactContext = useContext(ContactContext);
  // pull out the Contact state
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
// Nilipat ung key sa CSS Transition
