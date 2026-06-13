'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { OverviewProps } from './OverviewClient';
import { formatMoney } from '@/lib/pricing';

const PIE_COLORS = ['#fbbf24', '#737373', '#404040'];

export default function OverviewCharts({
  categoryData,
  statusData,
}: Pick<OverviewProps, 'categoryData' | 'statusData'>) {
  return (
    <section className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
      <article className="glass-panel p-5">
        <h2 className="font-semibold text-white">Inventario por categoría</h2>
        <div className="mt-5 h-72 min-h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid stroke="#262626" vertical={false} />
              <XAxis dataKey="name" stroke="#737373" fontSize={11} />
              <YAxis
                stroke="#737373"
                fontSize={11}
                tickFormatter={(value) => `$${Math.round(value / 100_000)}k`}
              />
              <Tooltip
                formatter={(value) => formatMoney(Number(value))}
                contentStyle={{
                  background: '#171717',
                  border: '1px solid #404040',
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="value" fill="#fbbf24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="glass-panel p-5">
        <h2 className="font-semibold text-white">Estado del catálogo</h2>
        <div className="mt-5 h-72 min-h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={4}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#171717',
                  border: '1px solid #404040',
                  borderRadius: 12,
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
