import React from 'react';
import { Story } from '@storybook/react';
import Input, { InputProps } from './Input';

export default {
  title: 'atoms/Input',
  component: Input,
};

const Template: Story<InputProps> = (args) => {
  const element = <Input {...args} />;
  return element;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'AtCoder',
};
