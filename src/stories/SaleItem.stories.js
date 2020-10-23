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
  price: 10,
  productSummary:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
};
