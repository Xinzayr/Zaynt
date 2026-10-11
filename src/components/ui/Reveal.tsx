'use client'

import { forwardRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface RevealProps {
  delay?: number
  duration?: number
  y?: number
  className?: string
  children: ReactNode
}

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  ({ className, delay = 0, duration = 0.6, y = 20, children, ...props }, ref) => {
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return (
        <div ref={ref} className={cn('opacity-100', className)} {...props}>
          {children as ReactNode}
        </div>
      )
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 1, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay, ease: 'easeOut' }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Reveal.displayName = 'Reveal'

export interface RevealItemProps {
  index: number
  stagger?: number
  className?: string
  children: ReactNode
}

export const RevealItem = forwardRef<HTMLDivElement, RevealItemProps>(
  ({ className, index, stagger = 0.1, children, ...props }, ref) => {
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return (
        <div ref={ref} className={cn('opacity-100', className)} {...props}>
          {children as ReactNode}
        </div>
      )
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * stagger, ease: 'easeOut' }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

RevealItem.displayName = 'RevealItem'