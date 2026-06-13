import type { QuoteStatus } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { getPrisma } from '@/lib/prisma';
import { formatMoney } from '@/lib/pricing';

const PAGE_SIZE = 25;
const STATUSES: QuoteStatus[] = [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'COMPLETED',
];

export default async function CotizacionesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}) {
  const parameters = await searchParams;
  const page = Math.max(1, Number.parseInt(parameters.page || '1', 10) || 1);
  const query = parameters.q?.trim() || '';
  const status = STATUSES.includes(parameters.status as QuoteStatus)
    ? (parameters.status as QuoteStatus)
    : undefined;
  const where = {
    ...(status ? { status } : {}),
    ...(query
      ? {
          OR: [
            { id: { contains: query, mode: 'insensitive' as const } },
            {
              client: {
                companyName: {
                  contains: query,
                  mode: 'insensitive' as const,
                },
              },
            },
          ],
        }
      : {}),
  };
  const prisma = getPrisma();
  const [quotes, total] = await Promise.all([
    prisma.quote.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        status: true,
        createdAt: true,
        client: { select: { companyName: true } },
        user: { select: { name: true, email: true } },
        items: { select: { quantity: true, unitPriceCents: true } },
      },
    }),
    prisma.quote.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const filters = new URLSearchParams();
  if (query) filters.set('q', query);
  if (status) filters.set('status', status);
  const filterSuffix = filters.toString() ? `&${filters}` : '';

  return (
    <main>
      <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
        Comercial
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-white">Cotizaciones</h1>

      <form
        action="/admin/cotizaciones"
        className="mt-7 grid max-w-3xl gap-2 sm:grid-cols-[1fr_13rem_auto]"
      >
        <label className="relative">
          <span className="sr-only">Buscar cotizaciones</span>
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-500"
          />
          <input
            name="q"
            defaultValue={query}
            className="field-control pl-12"
            placeholder="ID o cliente"
          />
        </label>
        <label>
          <span className="sr-only">Estado</span>
          <select name="status" defaultValue={status || ''} className="field-control">
            <option value="">Todos los estados</option>
            {STATUSES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="primary-button justify-center">
          Filtrar
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="px-5 py-4">Cotización</th>
                <th className="px-5 py-4">Cliente</th>
                <th className="px-5 py-4">Agente</th>
                <th className="px-5 py-4 text-right">Partidas</th>
                <th className="px-5 py-4 text-right">Total</th>
                <th className="px-5 py-4">Estado</th>
                <th className="px-5 py-4 text-right">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {quotes.map((quote) => {
                const totalCents = quote.items.reduce(
                  (sum, item) =>
                    sum + item.quantity * item.unitPriceCents,
                  0,
                );

                return (
                  <tr key={quote.id} className="text-neutral-300">
                    <td className="px-5 py-4 font-mono text-xs">
                      COT-{quote.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-5 py-4 font-medium text-white">
                      {quote.client.companyName}
                    </td>
                    <td className="px-5 py-4">
                      {quote.user.name || quote.user.email || 'Sin asignar'}
                    </td>
                    <td className="px-5 py-4 text-right">{quote.items.length}</td>
                    <td className="px-5 py-4 text-right font-medium text-amber-300">
                      {formatMoney(totalCents)}
                    </td>
                    <td className="px-5 py-4">{quote.status}</td>
                    <td className="px-5 py-4 text-right">
                      {quote.createdAt.toLocaleDateString('es-MX')}
                    </td>
                  </tr>
                );
              })}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-neutral-500">
                    No hay cotizaciones para estos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm text-neutral-500">
          <span>{total} cotizaciones</span>
          <div className="flex gap-2">
            <Link
              aria-disabled={page <= 1}
              href={`/admin/cotizaciones?page=${Math.max(1, page - 1)}${filterSuffix}`}
              className="secondary-button aria-disabled:pointer-events-none aria-disabled:opacity-40"
            >
              Anterior
            </Link>
            <Link
              aria-disabled={page >= totalPages}
              href={`/admin/cotizaciones?page=${Math.min(totalPages, page + 1)}${filterSuffix}`}
              className="secondary-button aria-disabled:pointer-events-none aria-disabled:opacity-40"
            >
              Siguiente
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
