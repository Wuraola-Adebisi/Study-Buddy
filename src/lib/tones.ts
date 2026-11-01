/* Soft tints used to tell learning spaces and materials apart. */
export const toneClasses = ['bg-accent-soft', 'bg-coral-soft', 'bg-yellow-soft', 'bg-lilac'] as const

export const toneFor = (index: number) => toneClasses[index % toneClasses.length]
