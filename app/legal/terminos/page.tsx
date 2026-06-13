import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Scale, Landmark, Truck, AlertOctagon } from 'lucide-react';

/**
 * Página de Términos y Condiciones de Grado Cero B2B.
 * Renderiza en servidor con un diseño formal, con secciones numeradas sobre los compromisos de
 * suministro industrial, condiciones de despacho de fórmulas químicas y directivas de pago.
 */
export default function TerminosPage() {
  return (
    <div className="bg-neutral-950 text-neutral-200 min-h-screen flex flex-col">
      {/* Header Estándar */}
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-10" id="terminos-main-container">
        {/* Encabezado */}
        <div className="border-b border-neutral-900 pb-8 text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 text-orange-500 rounded-2xl border border-orange-500/20 mb-2">
            <Scale size={28} />
          </div>
          <p className="text-xs font-mono tracking-widest uppercase text-orange-500">Documento de Cumplimiento B2B</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Términos y Condiciones Generales
          </h1>
          <p className="text-xs text-neutral-550 font-mono">Última actualización: 12 de Junio de 2026</p>
        </div>

        {/* Carta de Bienvenida Legal */}
        <div className="bg-neutral-900/20 border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-4">
          <p className="text-sm text-neutral-300 leading-relaxed">
            Bienvenido a la plataforma digital de <strong className="text-white">Grado Cero B2B S.A. de C.V.</strong> Al acceder a este portal de cotización o completar una compra de suministros mediante nuestras pasarelas, su representada mercantil expresa conformidad incondicional con las cláusulas detalladas a continuación. Por favor, lea detenidamente estas disposiciones antes de realizar pedidos.
          </p>
        </div>

        {/* Listado de Cláusulas */}
        <div className="space-y-8" id="terminos-clausulas">
          
          {/* Cláusula 1 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono text-sm">1.</span> 
              <span>Objeto Social y Capacidad Jurídica</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              Grado Cero B2B funciona exclusivamente como una plataforma de comercio electrónico entre empresas (<span className="text-neutral-200 font-bold">Business-to-Business</span>). El acceso y uso del catálogo se limita a personas físicas con actividad empresarial o personas morales debidamente constituidas bajo las leyes de los Estados Unidos Mexicanos u otros marcos regulatorios equivalentes. Queda estrictamente prohibida la adquisición de materias para uso de consumo doméstico o familiar sin los conocimientos técnicos y de manejo químico correspondientes.
            </p>
          </section>

          {/* Cláusula 2 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono text-sm">2.</span> 
              <span>Vigencia de Cotizaciones e Inventario</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              La simulación, cálculo de cotización o envío de borradores a través de la interfaz web no genera una obligación contractual de conservación de precio por más de un plazo máximo de <strong className="text-neutral-300">30 días naturales</strong>. Grado Cero B2B se reserva el derecho de actualizar los costos, márgenes logísticos de intermediación estándar (+30%) y aplicar variaciones arancelarias a las materias primas importadas en cualquier momento debido a la volatilidad de los mercados químicos internacionales.
            </p>
          </section>

          {/* Cláusula 3 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono text-sm">3.</span> 
              <span>Mecanismo de Pago en Línea (Stripe)</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              Los pagos procesados con tarjetas bancarias, SPEI o transferencias interbancarias se ejecutan de manera directa a través de nuestro proveedor de pagos e intermediario autorizado <strong className="text-neutral-300">Stripe</strong>. El cliente acepta someterse a las políticas corporativas asociadas de Stripe. Grado Cero B2B no resguarda credenciales bancarias complejas en sus bases de datos locales, delegando la total custodia de seguridad al portal homologado PCI-DSS de la pasarela de Stripe.
            </p>
            <div className="ml-6 flex items-center gap-2.5 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 text-[11px] text-orange-400">
              <Landmark size={14} className="shrink-0" />
              <span>Garantía de Suministros: Toda orden confirmada como &quot;PAID&quot; a través del Webhook se prioriza en el almacén de manera óptima para el cliente.</span>
            </div>
          </section>

          {/* Cláusula 4 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono text-sm">4.</span> 
              <span>Políticas de Envío, Entrega e Incoterms</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              Las entregas de reactivos químicos industriales se realizan bajo la modalidad estándar de entrega programada terrestre. En función del peligro intrínseco del compuesto adquirido (grados técnicos, solventes altamente concentrados, etc.), se entregarán exclusivamente en domicilios fiscales empresariales provistos con personal calificado de descarga e infraestructura apropiada. No se entregarán pedidos en apartados postales u oficinas no industriales habilitadas de forma doméstica.
            </p>
            <div className="ml-6 flex items-center gap-2 p-3 rounded-xl bg-neutral-900 text-[11px] text-neutral-400">
              <Truck size={14} className="text-orange-500 shrink-0" />
              <span>Plazos de Entrega: Estimación habitual de 5 a 8 días hábiles según la zona de cobertura e Incoterm asignado en cada cotización formal.</span>
            </div>
          </section>

          {/* Cláusula 5 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono text-sm">5.</span> 
              <span>Limitación de Responsabilidades y Hojas MSDS</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              De acuerdo con las Directrices de Manejo Seguro de Sustancias Químicas, es responsabilidad exclusiva del Comprador solicitar, asimilar y capacitar a sus operadores técnicos utilizando la Hoja de Seguridad (<strong className="text-neutral-300">MSDS / HDS</strong>) adjunta por producto. Grado Cero B2B no asume responsabilidad alguna por el mal almacenamiento, descomposición química no reportada por falta de control de temperatura de la empresa, o accidentes operacionales derivados del descuidar las fichas certificadas.
            </p>
            <div className="ml-6 flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/5 border border-red-500/10 text-[11px] text-red-400">
              <AlertOctagon size={14} className="shrink-0 text-red-500" />
              <span>ADVERTENCIA: Las formulaciones corrosivas e inflamables requieren licencias oficiales de almacenamiento vigentes de COFEPRIS u organismos homólogos, mismas que el transportista validará previamente al desembarque físico de la carga.</span>
            </div>
          </section>

          {/* Cláusula 6 */}
          <section className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-orange-500 font-mono text-sm">6.</span> 
              <span>Devoluciones, Mermas y Cancelaciones</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-6">
              Dada la naturaleza crítica de los químicos industriales, no se autorizarán devoluciones parciales o cancelaciones unilaterales una vez que el precinto físico del envase o tambor haya sido alterado, o cuando se trate de productos personalizados de grado analítico farmacéutico especiales. En caso de mermas por transporte terrestre imputables a la plataforma, se procederá a realizar la bonificación o reenvío correspondiente previo levantamiento técnico de quejas en menos de 48 horas tras el desembarco del material.
            </p>
          </section>

        </div>

        {/* Acciones de regreso */}
        <div className="pt-8 border-t border-neutral-900 text-center">
          <Link 
            href="/inicio" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-850 text-white font-semibold rounded-xl border border-neutral-800 hover:border-neutral-700 transition"
          >
            <span>Aceptar y Volver al Catálogo</span>
          </Link>
        </div>
      </main>

      {/* Footer Estándar */}
      <Footer />
    </div>
  );
}
