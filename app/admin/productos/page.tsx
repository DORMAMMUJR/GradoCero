'use client'

import React, { useState } from 'react';
import { 
  Package, 
  Settings, 
  Users, 
  BarChart, 
  LogOut, 
  Search, 
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  EyeOff,
  Eye,
  Activity
} from 'lucide-react';
import Link from 'next/link';

// Mock Data
type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DRAFT';

interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  purchaseCost: number;
  stock: number;
  status: ProductStatus;
}

const mockProducts: AdminProduct[] = [
  { id: '1', sku: 'GC-QI-001', name: 'Desengrasante Industrial Alto Rendimiento 20L', category: 'Químicos Industriales', purchaseCost: 96.53, stock: 450, status: 'ACTIVE' },
  { id: '2', sku: 'GC-PC-023', name: 'Papel Higiénico Jumbo Roll 500m (Caja 6 uni)', category: 'Papel & Celulosa', purchaseCost: 35.30, stock: 1200, status: 'ACTIVE' },
  { id: '3', sku: 'GC-EP-011', name: 'Mascarilla Respirador Medio Rostro 3M 6200', category: 'Equipos de Protección', purchaseCost: 24.76, stock: 120, status: 'INACTIVE' },
  { id: '4', sku: 'GC-IM-045', name: 'Escoba Barredora Industrial Filamentos Duros', category: 'Implementos Manuales', purchaseCost: 13.84, stock: 35, status: 'DRAFT' },
  { id: '5', sku: 'GC-QI-002', name: 'Cloro Concentrado 5% Galón 4L', category: 'Químicos Industriales', purchaseCost: 8.50, stock: 800, status: 'ACTIVE' },
];

const renderStatusBadge = (status: ProductStatus) => {
  switch(status) {
    case 'ACTIVE':
      return <span className="inline-flex items-center px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-bold tracking-wider">ACTIVO</span>;
    case 'INACTIVE':
      return <span className="inline-flex items-center px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold tracking-wider">INACTIVO</span>;
    case 'DRAFT':
      return <span className="inline-flex items-center px-2 py-1 rounded bg-neutral-500/20 text-neutral-400 text-xs font-bold tracking-wider">BORRADOR</span>;
  }
}

export default function AdminProductosPage() {
  const [searchTerm, setSearchTerm] = useState('');

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
          <Link href="/admin/productos" className="flex items-center gap-3 px-3 py-2 bg-orange-500/10 text-orange-500 rounded-lg font-medium transition-colors">
            <Package size={18} /> Productos
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg font-medium transition-colors">
            <Users size={18} /> Clientes
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg font-medium transition-colors">
            <BarChart size={18} /> Cotizaciones
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
           <h2 className="text-lg font-semibold text-white">Catálogo Operativo</h2>
           <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-400">Admin Staff</span>
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                 AD
              </div>
           </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:max-w-md">
              <input 
                type="text" 
                placeholder="Buscar por SKU, Nombre o Categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
              />
              <Search className="absolute left-3 top-2.5 text-neutral-500 w-5 h-5" />
            </div>
            <button className="whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm shadow-sm">
              <Plus size={18} /> Nuevo Producto
            </button>
          </div>

          {/* High Density Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-neutral-950/50 text-neutral-400 border-b border-neutral-800 font-medium">
                  <tr>
                    <th className="px-6 py-4 px-6">SKU</th>
                    <th className="px-6 py-4">Producto</th>
                    <th className="px-6 py-4">Categoría</th>
                    <th className="px-6 py-4 text-right font-mono">Costo Base</th>
                    <th className="px-6 py-4 text-right font-mono text-white">Pr. Venta (+30%)</th>
                    <th className="px-6 py-4 text-center">Stock</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {mockProducts.map((product) => {
                    const margin = 1.30;
                    const salePrice = product.purchaseCost * margin;
                    
                    return (
                      <tr key={product.id} className="hover:bg-neutral-800/30 transition-colors group">
                        <td className="px-6 py-4 font-mono text-xs text-neutral-400">{product.sku}</td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-neutral-200">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 text-neutral-400">{product.category}</td>
                        <td className="px-6 py-4 text-right font-mono text-neutral-400">
                          ${product.purchaseCost.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-orange-400 tracking-tight">
                          ${salePrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`${product.stock < 100 ? 'text-red-400 font-bold' : 'text-neutral-300'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {renderStatusBadge(product.status)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:text-white hover:bg-neutral-800 rounded transition" title="Editar">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-1.5 hover:text-yellow-400 hover:bg-neutral-800 rounded transition" title={product.status === 'ACTIVE' ? 'Ocultar (Soft Delete)' : 'Restaurar'}>
                              {product.status === 'ACTIVE' ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            {/* Physical delete must only happen if no quote relations exist, handled by backend */}
                            <button className="p-1.5 hover:text-red-400 hover:bg-neutral-800 rounded transition" title="Borrar (Solo si no hay cotizaciones)">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/20 text-xs text-neutral-500 flex items-center justify-between">
              <span>Mostrando {mockProducts.length} productos</span>
              <span>Calculados con un margen base estándar de +30%.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
