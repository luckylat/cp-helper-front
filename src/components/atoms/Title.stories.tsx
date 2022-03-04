import Title,{TitleProps} from './Title';
import { Story } from '@storybook/react'

export default {
  title: 'atoms/Title',
  component: Title,
};

const Template: Story<TitleProps> = args => {
  return <Title {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  value: 'This is Title',
  size: 60,
};
