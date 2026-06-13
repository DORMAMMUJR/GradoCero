import { DollarSign, Package, TrendingUp } from 'lucide-react';
import { LazyOverviewCharts } from './LazyOverviewCharts';
import { formatMoney } from '@/lib/pricing';

export interface OverviewProps {
  stats: {
    totalInventoryValueCents: number;
    activeQuotes: number;
    totalProducts: number;
  };
  categoryData: { name: string; value: number }[];
  statusData: { name: string; value: number }[];
}

export default function OverviewClient({
  stats,
  categoryData,
  statusData,
}: OverviewProps) {
  const cards = [
    {
      label: 'Valor de inventario',
      value: formatMoney(stats.totalInventoryValueCents),
      icon: DollarSign,
    },
    {
      label: 'Cotizaciones pendientes',
      value: String(stats.activeQuotes),
      icon: TrendingUp,
    },
    {
      label: 'Productos registrados',
      value: String(stats.totalProducts),
      icon: Package,
    },
  ];

  return (
    <main>
      <p className="text-xs uppercase tracking-[0.2em] text-amber-400">
        Operación
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-white">
        Resumen administrativo
      </h1>

      <section className="mt-7 grid gap-4 md:grid-cols-3">
        {cards.map(({ label, value, icon: Icon }) => (
          <article key={label} className="glass-panel p-5">
            <Icon aria-hidden="true" className="size-6 text-amber-400" />
            <p className="mt-5 text-sm text-neutral-400">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          </article>
        ))}
      </section>

      <LazyOverviewCharts
        categoryData={categoryData}
        statusData={statusData}
      />
    </main>
  );
}
