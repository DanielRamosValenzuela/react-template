import type { Metadata } from 'next';
import { commonConfig } from '@/config/environment';
import { QueryProvider } from '@/config/QueryProvider';
import { ConfigContextProvider } from '@/contexts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Falabella Seguros Starter',
  description: 'Base frontend multi-pais para productos de seguros Falabella.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-country={commonConfig.country}>
      <head>
        <link
          href="https://static.fif.tech/insurance-assets/seguros-ui/css/tomaco-ui.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConfigContextProvider config={commonConfig}>
          <QueryProvider>{children}</QueryProvider>
        </ConfigContextProvider>
      </body>
    </html>
  );
}
