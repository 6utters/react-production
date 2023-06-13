import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Text, TextSize, TextTheme } from './Text'
import { Theme } from '@/shared/const/theme'

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Light = Template.bind({})
Light.args = {
  title: 'Title',
  text: 'Some random text'
}

export const Dark = Template.bind({})
Dark.args = {
  title: 'Title',
  text: 'Some random text'
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const ErrorLight = Template.bind({})
ErrorLight.args = {
  title: 'Error',
  text: 'Some error text',
  theme: TextTheme.ERROR
}

export const ErrorDark = Template.bind({})
ErrorDark.args = {
  title: 'Error',
  text: 'Some error text',
  theme: TextTheme.ERROR
}
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyWithTitleLight = Template.bind({})
OnlyWithTitleLight.args = {
  title: 'Title'
}

export const OnlyWithTitleDark = Template.bind({})
OnlyWithTitleDark.args = {
  title: 'Title'
}
OnlyWithTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyWithTextLight = Template.bind({})
OnlyWithTextLight.args = {
  text: 'Some random text'
}

export const OnlyWithTextDark = Template.bind({})
OnlyWithTextDark.args = {
  text: 'Some random text'
}
OnlyWithTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SizeL = Template.bind({})
SizeL.args = {
  title: 'Title',
  text: 'Some random text',
  size: TextSize.L
}

export const SizeM = Template.bind({})
SizeM.args = {
  title: 'Title',
  text: 'Some random text',
  size: TextSize.M
}

export const SizeS = Template.bind({})
SizeS.args = {
  title: 'Title',
  text: 'Some random text',
  size: TextSize.S
}
