import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ShieldAlert, ShieldCheck, Mail, Lock, Key, Users, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

/**
 * Página de Aviso de Privacidad Integral de Grado Cero B2B.
 * Establece los procedimientos éticos y de seguridad para el manejo de credenciales mercantiles,
 * direcciones fiscales de despacho industrial e integración de pasarelas de pago de Stripe.
 */
export default function PrivacidadPage() {
  return (
    <div className="bg-neutral-950 text-neutral-200 min-h-screen flex flex-col">
      {/* Header Estándar */}
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-10" id="privacidad-main-container">
        
        {/* Encabezado */}
        <div className="border-b border-neutral-900 pb-8 text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20 mb-2">
            <ShieldCheck size={28} />
          </div>
          <p className="text-xs font-mono tracking-widest uppercase text-emerald-500">Privacidad y Seguridad B2B</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Aviso de Privacidad Integral
          </h1>
          <p className="text-xs text-neutral-550 font-mono">Última actualización: 12 de Junio de 2026</p>
        </div>

        {/* Resumen De Confianza */}
        <div className="bg-neutral-900/20 border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-4">
          <p className="text-sm text-neutral-300 leading-relaxed">
            En <strong className="text-white">Grado Cero B2B S.A. de C.V.</strong>, valoramos sustancialmente la integridad de la información operativa de su representada mercantil. Este documento tiene como objetivo explicar de manera transparente el tratamiento, almacenamiento y uso de los datos recabados de forma automatizada por nuestras interfaces de catálogo.
          </p>
        </div>

        {/* Secciones de la política */}
        <div className="space-y-8" id="privacidad-secciones">
          
          {/* Sección 1 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Eye size={16} className="text-emerald-500" />
              <span>1. Identidad del Responsable del Tratamiento</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              El responsable directo de resguardar y tratar de forma confidencial y segura su información es <strong className="text-neutral-300">Grado Cero B2B S.A. de C.V.</strong>, con domicilio legal corporativo en Paseo de la Reforma 250, Juárez, 06600 Ciudad de México, CDMX, México. Puede contactar directamente a nuestro Oficial de Privacidad y Cumplimiento de Datos enviando un correo electrónico a la dirección: <a href="mailto:info@gradocero.mx" className="text-orange-500 hover:underline">info@gradocero.mx</a>.
            </p>
          </section>

          {/* Sección 2 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Users size={16} className="text-emerald-500" />
              <span>2. Datos Personales y Corporativos Recabados</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              Para habilitar la generación de cotizaciones, simulaciones B2B y proveer facturación oficial automatizada, solicitamos los siguientes registros:
            </p>
            <ul className="list-disc pl-12 text-xs sm:text-sm text-neutral-400 space-y-2">
              <li>Nombre completo del apoderado o gestor comercial técnico de compras.</li>
              <li>Correo electrónico institucional o de representación mercantil.</li>
              <li>Número telefónico de contacto comercial (móvil o corporativo de planta).</li>
              <li>Nombre de la organización o razón social constituida y clave de RFC (en caso de requerir facturación).</li>
              <li>Dirección física de entrega con especificaciones de patio de maniobras de descarga química.</li>
            </ul>
          </section>

          {/* Sección 3 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Lock size={16} className="text-emerald-500" />
              <span>3. Finalidades Primarias de la Información</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              Los datos recabados se agrupan únicamente con la intención de cubrir los siguientes objetivos operacionales sustanciales:
            </p>
            <ul className="list-disc pl-12 text-xs sm:text-sm text-neutral-400 space-y-2">
              <li>Generación, despacho y envío remoto de la cotización o presupuesto de fórmulas industriales solicitado.</li>
              <li>Comunicación, seguimiento, asesoramiento técnico por parte de nuestros ingenieros de planta asignados a la cuenta.</li>
              <li>Creación en el Almacén de base de datos de usuarios seguros registrados como <strong className="text-neutral-300">CUSTOMER</strong> o aliados corporativos administrados bajo tecnología Prisma.</li>
              <li>Comprobación de pagos seguros de transacciones comerciales de suministros delegados y autorizados ante Stripe.</li>
              <li>Envío de alertas de entrega y plazos logísticos mediante mensajería o correspondencia electrónica.</li>
            </ul>
          </section>

          {/* Sección 4 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Key size={16} className="text-emerald-500" />
              <span>4. Seguridad de Pasarela y Cómputo de Pagos (Stripe)</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              Nuestra plataforma cuenta con una arquitectura de seguridad por tokens e implementa conexiones directas con servidores homologados de <strong className="text-neutral-300">Stripe Incorp</strong>. Toda autenticación de tarjetas bancarias, firmas y tokens, no se realiza ni conserva en los servidores de Grado Cero B2B. Los códigos de transacción y tokens de Webhooks se resguardan de forma encriptada bajo estándares militares de cifrado de extremo a extremo.
            </p>
          </section>

          {/* Sección 5 */}
          <section className="space-y-3" id="contacto">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert size={16} className="text-emerald-500" />
              <span>5. Ejercicio de Derechos ARCO</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              El titular mercantil tiene el derecho de acceder, rectificar, cancelar u oponerse al uso de sus datos personales resguardados por nuestro Almacén (<strong className="text-neutral-300">Derechos ARCO</strong>). Para iniciar dicho trámite o solicitar la purga definitiva de su cuenta de clientes registrada en nuestro sistema de base de datos de Prisma, se requerirá enviar un correo electrónico firmado digitalmente detallando el identificador mercantil a: <a href="mailto:info@gradocero.mx" className="text-orange-500 font-bold hover:underline">info@gradocero.mx</a>. Responderemos a su solicitud en un lapso no mayor a 10 días hábiles.
            </p>
          </section>

        </div>

        {/* Acciones de regreso */}
        <div className="pt-8 border-t border-neutral-900 text-center">
          <Link 
            href="/inicio" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-850 text-white font-semibold rounded-xl border border-neutral-800 hover:border-neutral-700 transition"
          >
            <span>Volver a Inicio</span>
          </Link>
        </div>

      </main>

      {/* Footer Estándar */}
      <Footer />
    </div>
  );
}
