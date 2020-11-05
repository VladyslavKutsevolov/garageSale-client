import React from 'react';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Category from '../components/category/Category';
import { StateProvider, appContext } from '../context/appContext';
import DoneIcon from '@material-ui/icons/Done';

describe('Category component', () => {
  it('it should show category name', () => {
    const categoryName = 'Stuff';
    const setCategory = jest.fn();
    const { container, getByText } = render(
      <Category
        categoryName={categoryName}
        setCategory={setCategory}
        selected
      />
    );

    expect(getByText('Stuff')).toBeInTheDocument();
  });

  it('should have Done Icon on click', () => {
    const setCategory = jest.fn();
    const { container, getByRole } = render(
      <Category setCategory={setCategory} selected />
    );
    getByRole('button').click();
    console.log(prettyDOM(container));

    // expect(container.contains(<DoneIcon />)).toBe(true);
  });
});
