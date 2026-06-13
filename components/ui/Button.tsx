'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Interfaz para las propiedades del componente Botón reusable.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Componente de Botón Base para la estructura de UI reutilizable.
 * Cumple con las directrices de accesibilidad y soporte de clases de Tailwind.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    // Definición de estilos base y variantes utilizando utility classes de Tailwind
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-amber-400 hover:bg-amber-300 text-neutral-950 border border-amber-300/30',
      secondary: 'bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 focus:ring-neutral-600',
      outline: 'bg-transparent hover:bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-neutral-700 focus:ring-neutral-800',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      ghost: 'bg-transparent hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 focus:ring-neutral-800'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2.5 text-xs sm:text-sm',
      lg: 'px-5 py-3 text-sm sm:text-base'
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
