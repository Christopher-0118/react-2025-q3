import type { Metadata } from 'next';
import Providers from '@/store/providers';
import ErrorBoundary from '@/components/error-boundary/error-boundary';
import { ThemeProvider } from '@/context/theme-context';
import '@/app/global.css';
// import Flyout from '@/components/flyout/flyout';
import ClientHeader from '@/components/client-header/client-header';

export const metadata: Metadata = {
  title: 'Pokémon app',
  description: 'Migrated from Vite to Next.js',
};

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ErrorBoundary>
            <ThemeProvider>
              <div id="root">
                <header className="header">
                  <ClientHeader />
                </header>
                <main className="main">{children}</main>
                <footer>
                  <p>© 2025 Pokémon App</p>
                </footer>
              </div>
            </ThemeProvider>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
