'use client';
import { usePathname } from 'next/navigation';

export default function RightPane({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const show = pathname.split('?')[0].includes('/details/');

  if (show) {
    return <div className="right-side">{children}</div>;
  }
  return null;
}
