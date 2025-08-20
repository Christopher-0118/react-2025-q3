'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

const LanguageToggle = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = locale === 'en' ? 'ru' : 'en';
  const handleClick = () => {
    router.replace({ pathname }, { locale: toggleLanguage });
  };
  return (
    <div className="toggle-language">
      <button onClick={handleClick}>{toggleLanguage}</button>
    </div>
  );
};

export default LanguageToggle;
