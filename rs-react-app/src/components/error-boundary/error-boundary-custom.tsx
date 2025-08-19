'use client';
import { useTranslations } from 'next-intl';
import ErrorBoundary from './error-boundary';

const ErrorBoundaryCustom = ({ children }: { children: React.ReactNode }) => {
  const errorBoundaryUi = useTranslations('ErrBoundary');

  return (
    <ErrorBoundary texts={{ message: errorBoundaryUi('errMessBoundary') }}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryCustom;
