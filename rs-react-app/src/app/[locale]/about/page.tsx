import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const About = async () => {
  const aboutUi = await getTranslations('About');
  return (
    <div className="about-page">
      <h2>{aboutUi('title')}</h2>
      <div className="about" data-testid="links">
        <a
          className="link link_github"
          href="https://github.com/Christopher-0118?tab=repositories"
        ></a>
        <a
          className="link link_rss"
          href="https://rs.school/courses/reactjs"
        ></a>
        <p>2025-Q3</p>
      </div>
      <Link href="/">
        <button className="close-button">✕</button>
      </Link>
    </div>
  );
};

export default About;
