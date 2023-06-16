import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Skeleton } from './Skeleton'
import { Theme } from '@/shared/const/theme'

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  width: '100%',
  height: 200
}

export const Dark = Template.bind({})
Dark.args = {
  width: '100%',
  height: 200
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Circle = Template.bind({})
Circle.args = {
  width: 100,
  height: 100,
  border: '50%'
}

export const CircleDark = Template.bind({})
CircleDark.args = {
  width: 100,
  height: 100,
  border: '50%'
}
CircleDark.decorators = [ThemeDecorator(Theme.DARK)]
