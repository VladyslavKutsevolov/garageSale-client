import React from 'react';
import {
  render,
  fireEvent,
  prettyDOM,
  waitForElement
} from '@testing-library/react';

import { StateProvider } from '../context/appContext';

import LoginForm from '../components/auth/LoginForm';

describe('Login Form', () => {
  it('renders without crashing', () => {
    render(
      <StateProvider>
        <LoginForm />
      </StateProvider>
    );
  });

  it('Submit login form form', async () => {
    const loginForm = (
      <StateProvider>
        <LoginForm open />
      </StateProvider>
    );
    const { getByTestId, getByText } = render(loginForm);

    await waitForElement(() => getByText('Enter your username and password'));

    const username = getByTestId('username');
    const password = getByTestId('password');
    const login = getByText('LogIn');

    fireEvent.change(username, { value: 'tester' });
    fireEvent.change(password, { value: 'tester' });

    fireEvent.click(login);
  });
});
