import {
  Activity,
  FileText,
  LogOut,
  Menu,
  Package,
  Store,
} from 'lucide-react';
import Link from 'next/link';

const navigation = [
  { href: '/admin', label: 'Resumen', icon: Activity },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/cotizaciones', label: 'Cotizaciones', icon: FileText },
];

export function AdminShell({
  children,
  userLabel,
  logoutAction,
}: {
  children: React.ReactNode;
  userLabel: string;
  logoutAction: () => Promise<void>;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 md:grid md:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="hidden border-r border-white/10 bg-neutral-900/70 md:flex md:min-h-screen md:flex-col">
        <Link href="/admin" className="border-b border-white/10 p-6">
          <span className="text-lg font-semibold tracking-[0.16em]">
            GRADO <span className="text-amber-400">CERO</span>
          </span>
          <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">
            Administración
          </span>
        </Link>
        <nav aria-label="Administración" className="flex-1 space-y-1 p-4">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
            >
              <Icon aria-hidden="true" className="size-4 text-amber-400" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate px-3 pb-3 text-xs text-neutral-500">
            {userLabel}
          </p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-300 transition hover:bg-red-400/10 hover:text-red-300"
            >
              <LogOut aria-hidden="true" className="size-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/85 px-4 py-3 backdrop-blur-xl md:hidden">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="flex items-center gap-2 font-semibold">
                <Store aria-hidden="true" className="size-5 text-amber-400" />
                Grado Cero Admin
              </span>
              <Menu aria-hidden="true" className="size-5" />
            </summary>
            <nav
              aria-label="Administración móvil"
              className="mt-4 grid gap-2 border-t border-white/10 pt-4"
            >
              {navigation.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-3 text-sm"
                >
                  <Icon aria-hidden="true" className="size-4 text-amber-400" />
                  {label}
                </Link>
              ))}
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-300"
                >
                  <LogOut aria-hidden="true" className="size-4" />
                  Cerrar sesión
                </button>
              </form>
            </nav>
          </details>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
