import type { Metadata } from 'next';
import Providers from '@/store/providers';
import { ThemeProvider } from '@/context/theme-context';
import '@/app/global.css';
import Flyout from '@/components/flyout/flyout';
import ClientHeader from '@/components/client-header/client-header';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import notFound from './not-found';
import { routing } from '@/i18n/routing';
import ErrorBoundaryCustom from '@/components/error-boundary/error-boundary-custom';
import { getMessages } from 'next-intl/server';
import RightPane from '@/components/right-side/right-side';

export const metadata: Metadata = {
  title: 'Pokémon app',
  description: 'Migrated from Vite to Next.js',
};

export const RootLayout = async ({
  children,
  details,
  params,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
  params: { locale: string };
}) => {
  const { locale } = await params;
  const messages = await getMessages();
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <ErrorBoundaryCustom>
              <ThemeProvider>
                <div id="root">
                  <header className="header">
                    <ClientHeader />
                  </header>
                  <main className="main">
                    <div className="left-side">{children}</div>
                    <div className="right-side">
                      <RightPane>{details}</RightPane>
                      <Flyout />
                    </div>
                  </main>
                  <footer>
                    <p>2025 Pokémon App</p>
                  </footer>
                </div>
              </ThemeProvider>
            </ErrorBoundaryCustom>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
