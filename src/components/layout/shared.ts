/** Gap scale shared by Stack and Grid so the two primitives stay visually consistent. */
export type Gap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const GAP_CLASSES: Record<Gap, string> = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
}
