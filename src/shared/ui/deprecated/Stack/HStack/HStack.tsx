import { FC } from 'react'
import { Flex, FlexProps } from '../Flex/Flex'

type HStackProps = Omit<FlexProps, 'direction'>

/**
 * Use new UI components from redesigned
 * @deprecated
 */
export const HStack: FC<HStackProps> = (props) => {
  const { className } = props

  return <Flex direction='row' {...props} />
}
