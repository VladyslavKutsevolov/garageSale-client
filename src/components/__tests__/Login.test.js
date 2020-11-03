import React, { createContext, useContext } from 'react';

import {
  fireEvent,
  getByText,
  getByTitle,
  getByTestId,
  render,
  cleanup
} from '@testing-library/react';

import MiniDrawer from '../navbar/MiniDrawer';
import LoginForm from '../auth/LoginForm';

afterEach(cleanup);

describe('Login', () => {
  const appContext = createContext();
  it('renders without crashing', () => {

    render(<MiniDrawer/>);
  });

  xit('renders login Form when login Button is clicked', () => {
    const { getByText } = render(<MiniDrawer />);

    expect(
      getByText('Welcome to Garage Sale App').toBe('Welcome to Garage Sale App')
    );
  });

  xit('renders login Form when login Button is clicked', () => {
    const { getByTestId, getByText } = render(<MiniDrawer />);

    fireEvent.click(getByTestId('drawer-opener'));
    fireEvent.click(getByTestId('login-form'));

    expect(getByText('username')).toHaveValue('');
  });
});
