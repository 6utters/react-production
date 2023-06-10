import { DropdownDirection } from '../../../types/ui'
import cls from './Popup.module.scss'

export const madDirectionClass: Record<DropdownDirection, string> = {
  'top left': cls.option_top_left,
  'top right': cls.option_top_right,
  'bottom left': cls.option_bottom_left,
  'bottom right': cls.option_bottom_right
}
