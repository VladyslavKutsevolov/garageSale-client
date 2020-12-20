import React from 'react';
import CommentContainer from '../components/comments/CommentContainer';

export default {
  title: 'Example/CommentContainer',
  component: CommentContainer,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <CommentContainer {...args} />;

export const commentContainer = Template.bind({});
