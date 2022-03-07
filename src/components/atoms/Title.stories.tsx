import React from 'react';
import { Story } from '@storybook/react';
import Title, { TitleProps } from './Title';

export default {
  title: 'atoms/Title',
  component: Title,
};

const Template: Story<TitleProps> = (args) => {
  const element = <Title {...args} />;
  return element;
};

export const Default = Template.bind({});
Default.args = {
  value: 'This is Title',
  size: 60,
};
