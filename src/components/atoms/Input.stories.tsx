import Input,{InputProps} from './Input';
import { Story } from '@storybook/react'

export default {
  title: 'atoms/Input',
  component: Input,
};

const Template: Story<InputProps> = args => {
  return <Input {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  placeholder: 'AtCoder',
};
