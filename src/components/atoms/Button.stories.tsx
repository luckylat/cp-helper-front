import Button from './Button';

export default {
  title: 'atoms/Button',
  component: Button,
};

function Template(args) {
  return <Button {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
  action: () => {
    window.alert('Hello!');
  },
};
