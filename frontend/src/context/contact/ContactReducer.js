import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };

    case CLEAR_CONTACTS: //clear contacts
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          //array contacts
          (contact) => contact.id !== action.payload
        ),
        loading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ), //action.payload is the whole contact
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const re = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(re) || contact.email.match(re);
        }),
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };

    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
