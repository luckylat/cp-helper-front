import React from 'react';
import { Story } from '@storybook/react';
import Dropdown, { DropdownProps } from './Dropdown';

export default {
  title: 'atoms/Dropdown',
  component: Dropdown,
};

const Template: Story<DropdownProps> = (args) => {
  const element = <Dropdown {...args} />;
  return element;
};

export const Default = Template.bind({});
Default.args = {
  items: [
    { value: 'aaa', text: 'aaa' },
    { value: 'bbb', text: 'bbb' },
  ],
};

export const NoValue = Template.bind({});
NoValue.args = {
  items: [{ text: 'aaa' }, { text: 'bbb' }],
};
