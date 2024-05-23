export interface AppListProps {
  layout: 'vertical' | 'horizontal',
}

export interface MessageBoxProps {
  type: 'primary' | 'success' | 'warning' | 'error'
  text: string,
  hidden: boolean
}
