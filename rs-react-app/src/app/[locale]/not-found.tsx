import { getTranslations } from 'next-intl/server';

const ErrorPage = async () => {
  const notFoundUi = await getTranslations('NotFound');
  return <p data-testid="error-message">{notFoundUi('message')}</p>;
};

export default ErrorPage;
