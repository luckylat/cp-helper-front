import Dropdown,{DropdownProps} from './Dropdown';
import { Story } from '@storybook/react'

export default {
  title: 'atoms/Dropdown',
  component: Dropdown,
};

const Template: Story<DropdownProps> = args => {
  return <Dropdown {...args} />;
}

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
