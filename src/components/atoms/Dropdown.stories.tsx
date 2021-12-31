import Dropdown from './Dropdown'

export default {
  title: 'atoms/Dropdown',
  component: Dropdown
}

const Template = (args) => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  items: [{value: "aaa",text: "aaa"},{value: "bbb",text: "bbb"}]
}

export const NoValue = Template.bind({})
NoValue.args = {
  items: [{text: "aaa"},{text: "bbb"}]
}


