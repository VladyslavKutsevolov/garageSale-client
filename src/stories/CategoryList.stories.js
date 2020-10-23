import React from 'react';
import CategoryList from '../components/category';
import '../index.scss';

export default {
  title: 'Example/CategoryList',
  component: CategoryList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const fakeCategoryList = [
  { id: 1, name: 'Toys & Games' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Camera & Photo' },
  { id: 4, name: 'Video Games' },
  { id: 5, name: 'Books' },
  { id: 6, name: 'Clothing' },
  { id: 7, name: 'Shoes' },
  { id: 8, name: 'Jewelry' }
];

const Template = args => <CategoryList {...args} />;

export const categoriesList = Template.bind({});

categoriesList.args = {
  categories: fakeCategoryList
};
