import React from 'react';
import { render } from '@testing-library/react';
import SaleCardList from '../components/saleCard/SaleCardList';
import { StateProvider } from '../context/appContext';

describe('Sale Card', () => {
  it('should render without crashing', () => {
    render(
      <StateProvider>
        <SaleCardList />
      </StateProvider>
    );
  });
});
