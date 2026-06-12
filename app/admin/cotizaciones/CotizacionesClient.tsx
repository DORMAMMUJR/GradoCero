'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Settings, 
  Users, 
  BarChart, 
  LogOut, 
  Search, 
  Plus,
  Activity,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Filter
} from 'lucide-react';
import Link from 'next/link';

interface Quote {
  id: string;
  quoteNumber: string;
  clientName: string;
  agentName: string;
  itemCount: number;
  totalAmount: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  date: string;
}

const renderStatusBadge = (status: string) => {
  switch(status) {
    case 'PENDING':
      return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-wider"><Clock size={12}/> PENDIENTE</span>;
    case 'ACCEPTED':
      return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold tracking-wider"><CheckCircle2 size={12}/> ACEPTADA</span>;
    case 'REJECTED':
      return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/10 text-red-500 text-xs font-bold tracking-wider"><XCircle size={12}/> RECHAZADA</span>;
    case 'COMPLETED':
      return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold tracking-wider"><CheckCircle2 size={12}/> COMPLETADA</span>;
    default:
      return <span className="inline-flex items-center px-2 py-1 rounded bg-neutral-500/10 text-neutral-400 text-xs font-bold tracking-wider">{status}</span>;
  }
}

export default function CotizacionesClient({ initialQuotes }: { initialQuotes: Quote[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  useEffect(() => {
    const localQuotesRaw = localStorage.getItem('grado_cero_quotes');
    if (localQuotesRaw) {
      try {
        const localQuotes = JSON.parse(localQuotesRaw);
        if (localQuotes && localQuotes.length > 0) {
          // Merge avoiding duplicates by quoteNumber
          const existingQuoteNumbers = new Set(initialQuotes.map(q => q.quoteNumber));
          const filteredLocal = localQuotes.filter((q: any) => !existingQuoteNumbers.has(q.quoteNumber));
          setTimeout(() => {
            setQuotes([...filteredLocal, ...initialQuotes]);
          }, 0);
        }
      } catch (err) {
        console.error("Error al leer cotizaciones locales:", err);
      }
    }
  }, [initialQuotes]);

  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          q.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg font-medium transition-colors">
            <Activity size={18} /> Resumen General
          </Link>
          <Link href="/admin/productos" className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg font-medium transition-colors">
            <Package size={18} /> Productos
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg font-medium transition-colors">
            <Users size={18} /> Clientes
          </a>
          <Link href="/admin/cotizaciones" className="flex items-center gap-3 px-3 py-2 bg-orange-500/10 text-orange-500 rounded-lg font-medium transition-colors">
            <BarChart size={18} /> Cotizaciones
          </Link>
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
           <h2 className="text-lg font-semibold text-white">Gestión de Cotizaciones</h2>
           <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-400">Admin Staff</span>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                 AD
              </div>
           </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto w-full">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex w-full sm:w-auto items-center gap-3">
               <div className="relative w-full sm:w-80">
                 <input 
                   type="text" 
                   placeholder="Buscar por ID o Cliente..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                 />
                 <Search className="absolute left-3 top-2.5 text-neutral-500 w-5 h-5" />
               </div>
               
               <div className="relative">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-lg py-2.5 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm font-medium"
                  >
                    <option value="ALL">Todos los Estados</option>
                    <option value="PENDING">Pendientes</option>
                    <option value="ACCEPTED">Aceptadas</option>
                    <option value="COMPLETED">Completadas</option>
                    <option value="REJECTED">Rechazadas</option>
                  </select>
                  <Filter className="absolute right-3 top-2.5 text-neutral-500 w-4 h-4 pointer-events-none" />
               </div>
            </div>

            <button className="whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm shadow-sm">
              <Plus size={18} /> Nueva Cotización
            </button>
          </div>

          {/* High Density Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-neutral-950/50 text-neutral-400 border-b border-neutral-800 font-medium">
                  <tr>
                    <th className="px-6 py-4">Revisar</th>
                    <th className="px-6 py-4">N° Cotización</th>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4 font-mono text-center">Items</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 font-mono">Agente</th>
                    <th className="px-6 py-4 text-right">Fecha (Aprox)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-neutral-800/30 transition-colors group">
                      <td className="px-6 py-4">
                          <button className="p-2 bg-neutral-800 hover:bg-orange-500 hover:text-white text-neutral-400 rounded transition-colors group-hover:shadow text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
                             <FileText size={14} /> Abrir
                          </button>
                      </td>
                      <td className="px-6 py-4 font-mono font-semibold text-neutral-300">{quote.quoteNumber}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-neutral-200">{quote.clientName}</div>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-orange-400 tracking-tight">
                        ${quote.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-neutral-400">
                        {quote.itemCount}
                      </td>
                      <td className="px-6 py-4">
                        {renderStatusBadge(quote.status)}
                      </td>
                      <td className="px-6 py-4 font-mono text-neutral-400">
                        {quote.agentName}
                      </td>
                      <td className="px-6 py-4 text-right text-neutral-500 font-mono text-xs">
                        {new Date(quote.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                  {filteredQuotes.length === 0 && (
                     <tr>
                         <td colSpan={8} className="px-6 py-12 text-center text-neutral-500">
                             No se encontraron cotizaciones con los filtros actuales.
                         </td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/20 text-xs text-neutral-500 flex items-center justify-between">
              <span>Mostrando {filteredQuotes.length} cotizaciones</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
