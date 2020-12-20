import React from 'react';
import Comment from '../components/comments/Comment';

export default {
  title: 'Example/Comment',
  component: Comment,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <Comment {...args} />;

export const comment = Template.bind({});
