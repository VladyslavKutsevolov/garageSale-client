import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  it('Submiting a form', async () => {
    const { container, getByText } = render(
      <StateProvider>
        <LoginForm />
      </StateProvider>
    );
    // expect(getByText('Enter your username and password')).toBeInTheDocument();
  });
});
