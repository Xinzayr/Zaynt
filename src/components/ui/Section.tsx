import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'dark' | 'muted'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-[#090a0c] text-white',
      dark: 'bg-black text-white',
      muted: 'bg-[#111317] text-white',
    }

    const sizes = {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-24',
      lg: 'py-20 md:py-28 lg:py-32',
      xl: 'py-24 md:py-32 lg:py-40',
    }

    return (
      <section
        ref={ref}
        className={cn(variants[variant], sizes[size], className)}
        {...props}
      >
        <div className="container-custom">{children}</div>
      </section>
    )
  }
)

Section.displayName = 'Section'