'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  ShieldCheck, 
  FileText, 
  BookOpen, 
  Award,
  Globe,
  MessageSquare,
  Facebook,
  Linkedin,
  Instagram,
  ArrowUp,
  MapPin
} from 'lucide-react';

/**
 * Componente Footer Corporativo de Grado Cero B2B.
 * Sigue la estética dark luxury e incorpora accesos directos a políticas legales y redes sociales, 
 * con un diseño 100% responsive y accesible.
 */
export const Footer: React.FC = () => {
  
  // Función para hacer scroll fluido hacia el inicio de la página
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="grado-cero-footer" 
      className="relative z-30 bg-zinc-950 border-t border-white/10 text-neutral-400 font-sans mt-auto"
    >
      {/* Botón flotante interno para regresar hacia arriba de forma elegante */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
        <button
          onClick={scrollToTop}
          id="btn-footer-scroll-top"
          className="flex items-center justify-center p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-white text-neutral-400 transition-all duration-300 shadow-xl group hover:scale-105 active:scale-95"
          title="Volver al inicio"
        >
          <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 xl:gap-14">
          
          {/* Columna 1: Branding y Propósito */}
          <div className="md:col-span-4 space-y-6" id="footer-branding-section">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-amber-500 rounded-xl text-white font-black text-sm tracking-wide">
                GC
              </span>
              <span className="font-sans font-extrabold tracking-tight text-white text-lg">
                Grado Cero <span className="text-amber-500 text-xs font-mono font-normal">B2B</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              Suministros y formulaciones químicas de grado industrial con eficiencia logística B2B integrada. Proveemos a la industria farmacéutica, manufacturera e institucional soluciones premium garantizadas.
            </p>

            <div className="space-y-3 pt-2">
              <h5 className="text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-bold">Distribuidor Autorizado</h5>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Award size={14} className="text-amber-500" />
                <span>Normas de Calidad Química Industrial</span>
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación de Soluciones */}
          <div className="md:col-span-2 space-y-4" id="footer-solutions-section">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-bold">Catálogo</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/inicio" id="link-footer-home" className="hover:text-amber-500 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/inicio?category=all" id="link-footer-products" className="hover:text-amber-500 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/admin" id="link-footer-admin" className="hover:text-amber-500 transition-colors">
                  Módulo de Carga
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información Legal */}
          <div className="md:col-span-3 space-y-4" id="footer-legal-section">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-bold">Documentos Legales</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <Link 
                  href="/legal/terminos" 
                  id="link-footer-terms" 
                  className="flex items-center gap-2 hover:text-amber-500 transition-colors text-neutral-400"
                >
                  <FileText size={14} className="text-neutral-500" />
                  <span>Términos y Condiciones</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/legal/privacidad" 
                  id="link-footer-privacy" 
                  className="flex items-center gap-2 hover:text-amber-500 transition-colors text-neutral-400"
                >
                  <ShieldCheck size={14} className="text-neutral-500" />
                  <span>Aviso de Privacidad</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/legal/privacidad#contacto" 
                  id="link-footer-compliance" 
                  className="flex items-center gap-2 hover:text-amber-500 transition-colors text-neutral-400"
                >
                  <BookOpen size={14} className="text-neutral-500" />
                  <span>Cumplimiento Legal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Canal de Contacto */}
          <div className="md:col-span-3 space-y-4" id="footer-contact-section">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-bold">Soporte Técnico Corporativo</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-neutral-400 leading-normal">
                  Paseo de la Reforma 250, Juárez, 06600 Ciudad de México, CDMX, México
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-amber-500 shrink-0" />
                <a href="mailto:info@gradocero.mx" id="link-footer-email" className="hover:text-amber-500 transition-colors truncate">
                  info@gradocero.mx
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-amber-500 shrink-0" />
                <a href="tel:+525555555555" id="link-footer-phone" className="hover:text-amber-500 transition-colors">
                  +52 55 5555 5555
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare size={15} className="text-amber-500 shrink-0" />
                <span className="text-neutral-300 font-semibold">Atención 24/7 para Clientes Activos</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Separador de sección */}
        <div className="border-t border-white/10 my-10" />

        {/* Bloque inferior: Redes Sociales e Información de derechos */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6" id="footer-bottom-bar">
          <div className="space-y-1">
            <p className="text-xs text-neutral-500 leading-normal">
              &copy; {currentYear} Grado Cero B2B S.A. de C.V. Todos los derechos reservados.
            </p>
            <p className="text-[10px] text-neutral-600">
              Las marcas comerciales y logotipos industriales citados son propiedad de sus respectivos dueños. Fabricación garantizada.
            </p>
          </div>

          {/* Redes Sociales Reales */}
          <div className="flex items-center gap-4" id="footer-social-wrapper">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              id="link-footer-social-facebook"
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-500 rounded-xl transition duration-250 border border-neutral-900 hover:border-neutral-800"
              title="Síguenos en Facebook"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              id="link-footer-social-linkedin"
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-500 rounded-xl transition duration-250 border border-neutral-900 hover:border-neutral-800"
              title="Síguenos en LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              id="link-footer-social-instagram"
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-500 rounded-xl transition duration-250 border border-neutral-900 hover:border-neutral-800"
              title="Síguenos en Instagram"
            >
              <Instagram size={16} />
            </a>
            <a 
              href="https://gradocero.mx" 
              target="_blank" 
              rel="noopener noreferrer"
              id="link-footer-social-website"
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-500 rounded-xl transition duration-250 border border-neutral-900 hover:border-neutral-800 flex items-center gap-1 text-[11px] font-mono"
              title="Sitio Web Institucional"
            >
              <Globe size={13} />
              <span>gradocero.mx</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
