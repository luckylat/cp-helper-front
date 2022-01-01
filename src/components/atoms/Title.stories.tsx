import Title from './Title';

export default {
  title: 'atoms/Title',
  component: Title,
};

function Template(args) {
  return <Title {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  value: 'This is Title',
  size: 60,
};
