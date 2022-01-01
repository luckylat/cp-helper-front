import Input from './Input';

export default {
  title: 'atoms/Input',
  component: Input,
};

function Template(args) {
  return <Input {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  placeholder: 'AtCoder',
};
