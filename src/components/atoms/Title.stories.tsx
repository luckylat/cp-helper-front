import Title from './Title'

export default{
  title: 'atoms/Title',
  component: Title
}

const Template = (args) => <Title {...args} />

export const Default = Template.bind({})
Default.args = {
  value:"This is Title"
}