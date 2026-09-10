import { useState } from 'react';

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

function useLogin(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const enableSubmit =
    isEmailValid(email) && password.length >= 8;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (enableSubmit) {
      onLogin(email, password);
    }
  };

  return {
    email,
    password,
    enableSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleLoginSubmit,
  };
}

export default useLogin;
