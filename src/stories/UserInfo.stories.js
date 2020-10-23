import React from 'react';
import UserInfo from '../components/userInfo';
import '../index.scss';

export default {
  title: 'Example/UserInfo',
  component: UserInfo,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <UserInfo />;

export const saleCard = Template.bind({});
