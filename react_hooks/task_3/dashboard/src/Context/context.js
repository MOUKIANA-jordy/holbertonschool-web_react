import { createContext } from 'react';

const newContext = createContext({
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
  logOut: () => {},
});

export default newContext;
