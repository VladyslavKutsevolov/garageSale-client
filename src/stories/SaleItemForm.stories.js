import React from 'react';
import SaleItemForm from '../components/saleItem/SaleItemForm';
import '../index.scss';

export default {
  title: 'Example/SaleItemForm',
  component: SaleItemForm,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <SaleItemForm {...args} />;

export const saleItemForm = Template.bind({});
