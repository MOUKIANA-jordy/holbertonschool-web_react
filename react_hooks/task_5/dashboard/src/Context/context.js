import { createContext } from 'react';

export const user = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export const logOut = () => {};

const NewContext = createContext({
  user,
  logOut,
});

export default NewContext;
