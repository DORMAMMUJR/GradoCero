'use client';

import dynamic from 'next/dynamic';
import type { OverviewProps } from './OverviewClient';

const OverviewCharts = dynamic(() => import('./OverviewCharts'), {
  loading: () => (
    <div className="mt-6 grid animate-pulse gap-6 xl:grid-cols-[2fr_1fr]">
      <div className="h-80 rounded-3xl bg-white/5" />
      <div className="h-80 rounded-3xl bg-white/5" />
    </div>
  ),
  ssr: false,
});

export function LazyOverviewCharts({
  categoryData,
  statusData,
}: Pick<OverviewProps, 'categoryData' | 'statusData'>) {
  return (
    <OverviewCharts categoryData={categoryData} statusData={statusData} />
  );
}
