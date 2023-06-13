import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CommentList } from './CommentList'

export default {
  title: 'entities/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />

export const Primary = Template.bind({})
Primary.args = {
  comments: [
    {
      id: '1',
      text: 'comment 2',
      user: {
        id: '1',
        username: 'user 1'
      }
    },
    {
      id: '2',
      text: 'comment 1',
      user: {
        id: '2',
        username: 'user 2'
      }
    }
  ]
}

export const Loading = Template.bind({})
Loading.args = {
  comments: [],
  isLoading: true
}
