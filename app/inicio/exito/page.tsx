import { CheckCircle2, Clock3, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';
import { getPrisma } from '@/lib/prisma';
import { formatMoney } from '@/lib/pricing';

interface SuccessPageProps {
  searchParams: Promise<{ sessionId?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { sessionId } = await searchParams;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!sessionId || !stripeKey) {
    notFound();
  }

  const stripeSession = await new Stripe(stripeKey).checkout.sessions.retrieve(
    sessionId,
  );
  const orderId = stripeSession.metadata?.orderId;

  if (!orderId) {
    notFound();
  }

  const order = await getPrisma().order.findFirst({
    where: {
      id: orderId,
      stripeCheckoutSessionId: sessionId,
    },
    select: {
      id: true,
      status: true,
      totalCents: true,
      items: {
        select: {
          id: true,
          quantity: true,
          priceCents: true,
          product: { select: { name: true, sku: true } },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const paid = order.status === 'PAID';

  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-4 py-12 text-neutral-100">
      <section className="glass-panel w-full max-w-2xl p-6 sm:p-9">
        <div className="flex items-start gap-4">
          <div
            className={`rounded-2xl p-3 ${
              paid
                ? 'bg-emerald-400/10 text-emerald-300'
                : 'bg-amber-400/10 text-amber-300'
            }`}
          >
            {paid ? (
              <CheckCircle2 aria-hidden="true" className="size-7" />
            ) : (
              <Clock3 aria-hidden="true" className="size-7" />
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
              Orden {order.id.slice(-8).toUpperCase()}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              {paid ? 'Pago confirmado' : 'Pago en validación'}
            </h1>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              {paid
                ? 'Stripe confirmó el pago y el inventario fue actualizado.'
                : 'La confirmación segura del webhook todavía está en proceso.'}
            </p>
          </div>
        </div>

        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-5 py-4"
            >
              <div>
                <p className="font-medium text-white">{item.product.name}</p>
                <p className="mt-1 text-xs text-neutral-500">
                  {item.product.sku} · {item.quantity} unidades
                </p>
              </div>
              <p className="font-medium text-neutral-200">
                {formatMoney(item.priceCents * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-xl">
          <span className="text-neutral-400">Total</span>
          <strong className="text-white">{formatMoney(order.totalCents)}</strong>
        </div>

        <Link
          href="/inicio"
          className="secondary-button mt-8 w-full justify-center py-3"
        >
          <ShoppingBag aria-hidden="true" className="size-5" />
          Volver al catálogo
        </Link>
      </section>
    </main>
  );
}
