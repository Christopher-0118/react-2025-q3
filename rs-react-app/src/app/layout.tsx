import type { Metadata } from 'next';
import Providers from '../store/providers';
import ErrorBoundary from '../components/error-boundary/error-boundary';
import { ThemeProvider } from '../context/theme-context';
import './global.css';

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
              <div id="root">{children}</div>
            </ThemeProvider>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
