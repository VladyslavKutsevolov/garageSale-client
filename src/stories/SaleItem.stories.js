import React from 'react';
import SaleItem from '../components/saleItem/SaleItem';
import '../index.scss';


export default {
  title: 'Example/SaleCard',
  component: SaleItem,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <SaleItem />;

export const saleItem = Template.bind({});
