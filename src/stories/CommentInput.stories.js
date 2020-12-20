import React from 'react';
import CommentInput from '../components/comments/CommentInput';

export default {
  title: 'Example/CommentInput',
  component: CommentInput,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <CommentInput {...args} />;

export const commentInput = Template.bind({});
