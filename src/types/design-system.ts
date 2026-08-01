/** Shared unions used across layout, typography and button components. */

/** Generic small/medium/large sizing, used by buttons and icon wrappers. */
export type Size = 'sm' | 'md' | 'lg'

/** Container max-width variants — mirrors the --container-* tokens in globals.css. */
export type ContainerWidth = 'narrow' | 'content' | 'wide' | 'full'

/** Section vertical-rhythm variants — mirrors the --spacing-section-* tokens. */
export type SectionSpacing = 'sm' | 'md' | 'lg'

/** Light (default) or inverse (--ink) surface, for full-bleed dark sections. */
export type Tone = 'light' | 'ink'
