export interface IMenuTop {
  items: {
    title: string,
    to: string,
    active: boolean,
  }[]
  theme?: string[] | string
}
