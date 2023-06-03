import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ArticleViewSelect } from './ArticleViewSelect'

export default {
  title: 'entities/ArticleViewSelect',
  component: ArticleViewSelect,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleViewSelect>

const Template: ComponentStory<typeof ArticleViewSelect> = (args) => <ArticleViewSelect {...args} />

export const Primary = Template.bind({})
Primary.args = {}
