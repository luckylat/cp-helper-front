import Button from './Button'

export default {
  title: 'atoms/Button',
  component: Button
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Button',
  action: () => {
    window.alert("Hello!")
  }
}


