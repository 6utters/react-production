import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ListBox } from './ListBox'

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [
    (Story) => <div style={{ padding: '100px' }}><Story /></div>
  ]
} as ComponentMeta<typeof ListBox>

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />

export const TopLeft = Template.bind({})
TopLeft.args = {
  direction: 'top left',
  value: 'value1',
  items: [
    {
      content: 'content1', value: 'value1'
    },
    {
      content: 'content2', value: 'value2'
    },
    {
      content: 'content2', value: 'value3'
    }
  ]
}

export const TopRight = Template.bind({})
TopRight.args = {
  direction: 'top right',
  value: 'value1',
  items: [
    {
      content: 'content1', value: 'value1'
    },
    {
      content: 'content2', value: 'value2'
    },
    {
      content: 'content2', value: 'value3'
    }
  ]
}

export const BottomLeft = Template.bind({})
BottomLeft.args = {
  direction: 'bottom left',
  value: 'value1',
  items: [
    {
      content: 'content1', value: 'value1'
    },
    {
      content: 'content2', value: 'value2'
    },
    {
      content: 'content2', value: 'value3'
    }
  ]
}

export const BottomRight = Template.bind({})
BottomRight.args = {
  direction: 'bottom right',
  value: 'value1',
  items: [
    {
      content: 'content1', value: 'value1'
    },
    {
      content: 'content2', value: 'value2'
    },
    {
      content: 'content2', value: 'value3'
    }
  ]
}
