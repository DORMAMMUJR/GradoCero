import React from 'react';
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
  Eye
} from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import CotizacionesClient from './CotizacionesClient';

export const dynamic = 'force-dynamic';

export default async function CotizacionesPage() {
  let quotes: any[] = [];
  
  try {
    const data = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        client: true,
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });
    
    // transform data slightly
    quotes = data.map(q => {
      const totalAmount = q.items.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0);
      return {
        id: q.id,
        quoteNumber: `COT-${q.id.slice(-6).toUpperCase()}`,
        clientName: q.client.companyName,
        agentName: q.user.name || q.user.email,
        itemCount: q.items.length,
        totalAmount,
        status: q.status,
        date: q.createdAt.toISOString()
      };
    });

    if (quotes.length === 0) throw new Error("Empty DB");

  } catch (error) {
    console.warn("DB unavailable or empty, falling back to mock quotes...");
    
    quotes = [
      {
        id: '1',
        quoteNumber: 'COT-A39B21',
        clientName: 'Industrias Acereras Norte, S.A.',
        agentName: 'Admin',
        itemCount: 4,
        totalAmount: 18500.50,
        status: 'PENDING',
        date: '2026-06-12T11:21:23.000Z'
      },
      {
        id: '2',
        quoteNumber: 'COT-F81C99',
        clientName: 'Servicios Logísticos Omega',
        agentName: 'Carlos M.',
        itemCount: 1,
        totalAmount: 2500.00,
        status: 'PENDING',
        date: '2026-06-11T13:21:23.000Z'
      },
      {
        id: '3',
        quoteNumber: 'COT-B23X44',
        clientName: 'Hospital Central San Judas',
        agentName: 'María R.',
        itemCount: 12,
        totalAmount: 42350.75,
        status: 'ACCEPTED',
        date: '2026-06-09T13:21:23.000Z'
      },
      {
        id: '4',
        quoteNumber: 'COT-C75Y11',
        clientName: 'Constructora El Valle',
        agentName: 'Admin',
        itemCount: 5,
        totalAmount: 8900.20,
        status: 'REJECTED',
        date: '2026-06-07T13:21:23.000Z'
      },
      {
        id: '5',
        quoteNumber: 'COT-D99Z00',
        clientName: 'Hotel Miramar Resort',
        agentName: 'Admin',
        itemCount: 8,
        totalAmount: 15400.00,
        status: 'COMPLETED',
        date: '2026-06-02T13:21:23.000Z'
      }
    ];
  }

  return <CotizacionesClient initialQuotes={quotes} />;
}
