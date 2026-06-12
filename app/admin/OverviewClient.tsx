'use client';

import React from 'react';
import { Package, Settings, Users, BarChart as BarChartIcon, LogOut, Activity, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const PIE_COLORS = ['#f97316', '#525252', '#262626'];

interface OverviewProps {
  stats: {
    totalInventoryValue: number;
    activeQuotes: number;
    totalProducts: number;
  };
  categoryData: { name: string; value: number }[];
  statusData: { name: string; value: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-700 p-3 rounded-lg shadow-xl">
        <p className="text-white font-medium mb-1">{label}</p>
        <p className="text-orange-500 font-mono font-bold">
          ${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
};

export default function OverviewClient({ stats, categoryData, statusData }: OverviewProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-neutral-800">
           <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-orange-500">GRADO</span> CERO
           </h1>
           <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest font-semibold font-mono">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 bg-orange-500/10 text-orange-500 rounded-lg font-medium transition-colors">
            <Activity size={18} /> Resumen General
          </Link>
          <Link href="/admin/productos" className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg font-medium transition-colors">
            <Package size={18} /> Productos
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg font-medium transition-colors">
            <Users size={18} /> Clientes
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg font-medium transition-colors">
            <BarChartIcon size={18} /> Cotizaciones
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg font-medium transition-colors">
            <Settings size={18} /> Configuración
          </a>
        </nav>
        <div className="p-4 border-t border-neutral-800">
           <button className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-red-400 transition-colors w-full">
            <LogOut size={18} /> Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-full overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-neutral-900/50 border-b border-neutral-800 sticky top-0 z-10 backdrop-blur-md">
           <h2 className="text-lg font-semibold text-white">Dashboard Overview</h2>
           <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-400">Admin Staff</span>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                 AD
              </div>
           </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Métricas de Negocio</h3>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-lg flex items-center gap-4 hover:border-neutral-700 transition-colors">
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-lg">
                      <DollarSign size={28} />
                  </div>
                  <div>
                      <p className="text-sm text-neutral-400 font-medium tracking-wide">Valor Total Inventario</p>
                      <p className="text-2xl font-bold text-white font-mono tracking-tight mt-1">
                        ${stats.totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                  </div>
               </div>
               <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-lg flex items-center gap-4 hover:border-neutral-700 transition-colors">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-lg">
                      <TrendingUp size={28} />
                  </div>
                  <div>
                      <p className="text-sm text-neutral-400 font-medium tracking-wide">Cotizaciones Activas</p>
                      <p className="text-2xl font-bold text-white font-mono tracking-tight mt-1">{stats.activeQuotes}</p>
                  </div>
               </div>
               <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-lg flex items-center gap-4 hover:border-neutral-700 transition-colors">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg">
                      <Package size={28} />
                  </div>
                  <div>
                      <p className="text-sm text-neutral-400 font-medium tracking-wide">Productos en Catálogo</p>
                      <p className="text-2xl font-bold text-white font-mono tracking-tight mt-1">{stats.totalProducts}</p>
                  </div>
               </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Val. Inventario Por Categoría */}
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-lg lg:col-span-2 flex flex-col">
                    <h4 className="text-lg font-semibold text-white mb-6 tracking-wide">Valor Inventario por Categoría</h4>
                    <div className="h-72 flex-1 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                            <XAxis 
                              dataKey="name" 
                              stroke="#737373" 
                              fontSize={12} 
                              tickLine={false} 
                              axisLine={false} 
                              dy={10}
                            />
                            <YAxis 
                              stroke="#737373" 
                              fontSize={12} 
                              tickLine={false} 
                              axisLine={false} 
                              tickFormatter={(val) => `$${val / 1000}k`} 
                              dx={-10}
                            />
                            <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#262626', opacity: 0.4 }} />
                            <Bar 
                              dataKey="value" 
                              fill="#f97316" 
                              radius={[4, 4, 0, 0]} 
                              maxBarSize={60} 
                            />
                          </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribución de Estados */}
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl shadow-lg flex flex-col">
                    <h4 className="text-lg font-semibold text-white mb-6 tracking-wide">Estado del Catálogo</h4>
                    <div className="h-72 flex-1 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={statusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={70}
                              outerRadius={90}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="transparent" />
                              ))}
                            </Pie>
                            <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend 
                              verticalAlign="bottom" 
                              height={36} 
                              iconType="circle" 
                              wrapperStyle={{ fontSize: '13px', color: '#a3a3a3', paddingTop: '20px' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
