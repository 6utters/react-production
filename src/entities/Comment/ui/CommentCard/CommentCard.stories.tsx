import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CommentCard } from './CommentCard'
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator'

export default {
  title: 'entities/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />
const primaryArgs = {
  comment: {
    id: '1',
    text: 'comment 2',
    user: {
      id: '1',
      username: 'user 1'
    }
  }
}

export const Primary = Template.bind({})
Primary.args = primaryArgs

export const PrimaryRedesigned = Template.bind({})
PrimaryRedesigned.args = primaryArgs
PrimaryRedesigned.decorators = [FeatureFlagsDecorator({ isAppRedesigned: true })]

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
