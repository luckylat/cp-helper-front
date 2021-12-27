import Input from './Input'

export default{
  title: 'atoms/Input',
  component: Input
}

const Template = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'AtCoder'
}