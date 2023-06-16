import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CommentCard } from './CommentCard'

export default {
  title: 'entities/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  comment: {
    id: '1',
    text: 'comment 2',
    user: {
      id: '1',
      username: 'user 1'
    }
  }
}

export const Loading = Template.bind({})
Loading.args = {
  comment: {
    id: '1',
    text: 'comment 2',
    user: {
      id: '1',
      username: 'user 1'
    }
  },
  isLoading: true
}
