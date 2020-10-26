import React from 'react';
import SaleForm from '../components/saleCard/SaleForm';
import '../index.scss';

export default {
  title: 'Example/SaleForm',
  component: SaleForm,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <SaleForm {...args} />;

export const saleItemForm = Template.bind({});
