import { MenuItem } from '@src/components/navigation/menu/types'

export interface IMenuTop {
  items: {
    title: string,
    link: string,
    active: boolean,
  }[]
  theme?: string[] | string
  onNavigate?: (item: MenuItem)=> void
}
