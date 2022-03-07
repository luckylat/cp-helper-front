import React from 'react';
import { Story } from '@storybook/react';
import Button, { ButtonProps } from './Button';

export default {
  title: 'atoms/Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => {
  const element = <Button {...args} />;
  return element;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  action: () => {
    window.alert('Hello!');
  },
};
