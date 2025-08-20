'use client';
import { usePathname } from '@/i18n/navigation';

export default function RightPane({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const show = pathname.split('?')[0].includes('/details/');

  if (show) {
    return <>{children}</>;
  }
  return null;
}
