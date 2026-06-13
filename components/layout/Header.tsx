'use client';

import * as React from 'react';
import Link from 'next/link';
import { Bot, LogIn, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Propiedades del componente opcionales para mayor flexibilidad.
 */
interface HeaderProps {
  userEmail?: string | null;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  cartCount?: number;
  onAssistantToggle?: () => void;
  onCartClick?: () => void;
}

/**
 * Componente Header Reusable de la sección de Layouts.
 * Centra y estandariza la barra de navegación superior del sitio para todo el catálogo actual y futuro.
 */
export const Header: React.FC<HeaderProps> = ({
  userEmail,
  onLoginClick,
  onLogoutClick,
  cartCount = 0,
  onAssistantToggle,
  onCartClick
}) => {
  return (
    <header 
      id="layout-header"
      className="sticky top-0 z-40 w-full bg-zinc-950/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Identidad Grado Cero */}
        <div className="flex items-center gap-2">
          <Link href="/inicio" className="flex items-center gap-2 group" id="link-header-logo">
            <span className="p-2 bg-amber-500 rounded-xl text-white font-black text-sm tracking-wide transition group-hover:scale-105 active:scale-95">
              GC
            </span>
            <span className="font-sans font-bold tracking-tight text-neutral-100 text-sm sm:text-base hidden sm:inline-block">
              Grado Cero <span className="text-amber-500 text-xs font-mono font-normal">B2B</span>
            </span>
          </Link>
        </div>

        {/* Acciones de Navegación del Catálogo */}
        <div className="flex items-center gap-3">
          {/* Asistente IA */}
          {onAssistantToggle && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAssistantToggle}
              id="btn-header-assistant"
              className="gap-1.5 hidden md:inline-flex"
            >
              <Bot size={15} className="text-amber-500" />
              <span>Ayuda IA</span>
            </Button>
          )}

          {/* Icono de Carrito para Catalogo */}
          <div className="relative" id="header-cart-icon-wrapper">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 relative text-neutral-400 hover:text-neutral-100"
              id="btn-header-cart"
              onClick={onCartClick}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 bg-amber-500 text-[10px] text-white font-extrabold items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>

          {/* Autenticación & Perfil */}
          {userEmail ? (
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-850" id="user-profile-menu-trigger">
              <span className="text-xs text-neutral-400 font-mono hidden md:inline-block truncate max-w-[150px]">
                {userEmail}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogoutClick}
                id="btn-header-logout"
                className="text-neutral-300 border-neutral-800"
              >
                Salir
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onLoginClick}
              id="btn-header-login"
              className="gap-1.5"
            >
              <LogIn size={14} />
              <span>Entrar</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
