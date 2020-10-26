import React from 'react';
import Carousel from '../components/carousel/Carousel';

export default {
  title: 'Example/Carousel',
  component: Carousel,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <Carousel {...args} />;

export const carousel = Template.bind({});


