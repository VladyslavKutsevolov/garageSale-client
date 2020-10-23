import React from 'react';
import SaleItem from '../components/saleItem/SaleItem';
import '../index.scss';

export default {
  title: 'Example/SaleItem',
  component: SaleItem,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <SaleItem {...args} />;

export const saleItem = Template.bind({});

saleItem.args = {
  imageUrl: 'https://picsum.photos/300/210',
  title: 'title',
  description: 'description',
  price: 10
};
