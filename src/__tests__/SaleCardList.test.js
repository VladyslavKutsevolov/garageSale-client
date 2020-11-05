import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SaleCardList from '../components/saleCard/SaleCardList';
import { StateProvider, appContext } from '../context/appContext';

const state = {
  sales: [
    {
      city: 'Cherkasy',
      cover_photo_url: 'https://i.imgur.com/p0pYOp0.jpg',
      description: 'TAKE A LOOK!!!',
      id: 1,
      province: 'Ukraine',
      seller_id: 1,
      title: 'Huge Sale'
    }
  ]
};

describe('Sale Card List', () => {
  it('should render without crashing', () => {
    render(
      <StateProvider>
        <SaleCardList />
      </StateProvider>
    );
  });

  it('should display title, location, and description', () => {
    const fetchSales = jest.fn();
    const { getByText } = render(
      <StateProvider>
        <appContext.Provider value={{ state, fetchSales }}>
          <Router>
            <SaleCardList />
          </Router>
        </appContext.Provider>
      </StateProvider>
    );

    expect(getByText('Huge Sale')).toBeInTheDocument();
    expect(getByText('TAKE A LOOK!!!')).toBeInTheDocument();
    expect(getByText('Cherkasy, Ukraine')).toBeInTheDocument();
  });
});
