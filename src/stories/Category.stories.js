import React from 'react';
import Category from '../components/category/Category';
import '../index.scss';

export default {
  title: 'Example/Category',
  component: Category,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <Category {...args} />;

export const category = Template.bind({});

category.args = {
  categoryName: 'Electronics'
};

export const categorySelected = Template.bind({});

categorySelected.args = {
  categoryName: 'Electronics',
  selected: () => console.log('selected')
};
