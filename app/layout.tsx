import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Grado Cero',
  description: 'B2B E-commerce platform for industrial cleaning products.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var originalFetch = window.fetch;
                  var fetchValue = originalFetch;
                  Object.defineProperty(window, 'fetch', {
                    get: function() { return fetchValue; },
                    set: function(val) { fetchValue = val; },
                    configurable: true,
                    enumerable: true
                  });
                } catch (e) {
                  console.error("Failed to patch window.fetch property descriptor:", e);
                }
              })();
            `
          }}
        />
      </head>
      <body className="bg-neutral-950 text-white antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
