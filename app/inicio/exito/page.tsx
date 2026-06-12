import prisma from '@/lib/prisma';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight, ShieldCheck, Mail, Building, Landmark, Receipt } from 'lucide-react';

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string; simulated?: string }>;
}

/**
 * Página de Éxito de Compra para Grado Cero B2B.
 * Renderizada en el servidor, lee los parámetros de la URL de forma asíncrona (Next.js 15), 
 * consulta los datos directos de la orden en Prisma y produce una maqueta visualmente pulida.
 */
export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { orderId, simulated } = await searchParams;

  if (!orderId) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4 border border-neutral-900 bg-neutral-900/40 backdrop-blur-md p-8 rounded-2xl">
          <p className="text-sm font-mono text-orange-500 uppercase tracking-widest">Error de Sesión</p>
          <h1 className="text-2xl font-bold tracking-tight text-white font-sans">No se encontró la orden</h1>
          <p className="text-sm text-neutral-400">
            La URL cargada no contiene un identificador válido para obtener la confirmación de la orden de compra.
          </p>
          <div className="pt-4">
            <Link 
              href="/inicio" 
              className="inline-flex items-center gap-2 justify-center px-5 py-3 w-full bg-orange-500 hover:bg-orange-600 font-medium text-white rounded-xl transition duration-200"
            >
              <ShoppingBag size={16} />
              <span>Volver al Catálogo</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Buscar la orden en la base de datos de Prisma
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center space-y-4 border border-neutral-900 bg-neutral-900/40 p-8 rounded-2xl">
          <p className="text-sm font-mono text-red-500 uppercase tracking-widest">No Encontrado</p>
          <h1 className="text-2xl font-bold text-white">Orden Inválida</h1>
          <p className="text-sm text-neutral-400">
            No pudimos localizar la orden con código <span className="font-mono text-neutral-200">{orderId}</span> en nuestra base de datos.
          </p>
          <div className="pt-4">
            <Link 
              href="/inicio" 
              className="inline-flex items-center gap-2 justify-center px-4 py-2.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-xl transition duration-200"
            >
              <span>Volver a Inicio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isSimulated = simulated === 'true';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        {/* Cabecera de Confirmación */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 mb-2 animate-bounce">
            <CheckCircle2 size={42} />
          </div>
          <p className="text-xs font-mono tracking-widest uppercase text-orange-500">
            {isSimulated ? 'Prueba de Compra Completada' : 'Pago Confirmado'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
            ¡Gracias por tu Orden de Compra!
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Hemos recibido los detalles de cotización y pago para los productos de tu organización. Un ejecutivo de <strong className="text-neutral-200">Grado Cero B2B</strong> se pondrá en contacto pronto.
          </p>
        </div>

        {/* Alerta de Modo de Simulación Sandbox */}
        {isSimulated && (
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4 flex gap-3 items-start">
            <ShieldCheck size={20} className="text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Modo Integración Activo</h4>
              <p className="text-xs text-neutral-400 mt-1">
                La orden se procesó en el entorno sandbox de desarrollo (gracias a nuestra arquitectura resiliente que simula compras cuando aún no se registran secretos productivos de Stripe).
              </p>
            </div>
          </div>
        )}

        {/* Tarjeta de Detalles del Resumen */}
        <div className="border border-neutral-900 bg-neutral-900/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
          <div className="border-b border-neutral-900 bg-neutral-900/60 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Identificador de Compra</p>
              <p className="text-sm font-mono font-bold text-orange-400">{order.id}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Método de Facturación</p>
              <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
                <Receipt size={14} className="text-neutral-400" />
                <span className="text-xs text-neutral-300 font-medium">B2B Stripe Checkout</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Detalle del Comprador */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-neutral-900/60 pb-6">
              <div className="space-y-1">
                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Building size={12} className="text-orange-500" /> Cliente / Organización
                </p>
                <p className="text-sm font-semibold text-neutral-100">{order.user.name || 'Empresa Registrada'}</p>
                <p className="text-xs text-neutral-400 font-mono">{order.user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Landmark size={12} className="text-orange-500" /> Estado de la Transacción
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg ${
                    order.status === 'PAID' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                  }`}>
                    {order.status === 'PAID' ? 'LIQUIDADO (WEBHOOK/STRIPE)' : 'NUEVO / PENDIENTE'}
                  </span>
                </div>
              </div>
            </div>

            {/* Listado de Productos Adquiridos */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Partidas Compradas</h3>
              <div className="divide-y divide-neutral-900/40">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.product.name}</p>
                      <p className="text-xs text-neutral-500 font-mono mt-0.5">
                        SKU: {item.product.sku} — Cantidad: {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold font-mono text-neutral-200">
                        ${(item.price * item.quantity).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gran Total */}
            <div className="border-t border-neutral-900 pt-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider">Subtotal Neto</p>
                <p className="text-[10px] text-neutral-550">Incluye cargo logístico estándar</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider">Total de Orden</p>
                <p className="text-2xl font-black font-mono text-orange-500">
                  ${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje Informativo y Botones de Retorno */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center text-xs text-neutral-500 pt-4 px-2">
          <p className="flex items-center gap-1.5">
            <Mail size={12} className="text-orange-500" />
            <span>Soporte de Cuenta: info@gradocero.mx</span>
          </p>
          <div className="flex gap-4">
            <Link 
              href="/inicio" 
              className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-400 font-bold transition duration-200"
            >
              <span>Regresar al Catálogo</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
