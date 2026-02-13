import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: string;
  link: string;
  emoji: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'JobHunter07 Overview',
    emoji: '📋',
    description: 'JobHunter07 is a community-run, human-first employment platform ...',
    link: '/docs/about/overview',
  },
  {
    title: 'Our Mission',
    emoji: '📋',
    description: 'Empowering Workers Through Community Ownership',
    link: '/docs/about/mission',
  },
  {
    title: 'Our Values',
    emoji: '📋',
    description: 'The principles that guide everything we build and every decision we ...',
    link: '/docs/about/values',
  },
  {
    title: 'Frequently Asked Questions',
    emoji: '📋',
    description: 'Quick answers to common questions about JobHunter07.',
    link: '/docs/about/faq',
  },
  {
    title: 'Glossary',
    emoji: '📋',
    description: 'Key terms and concepts used throughout JobHunter07 and this docu...',
    link: '/docs/about/glossary',
  },
];

function Feature({title, emoji, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')} style={{marginBottom: '2rem'}}>
      <Link to={link} style={{textDecoration: 'none', color: 'inherit'}}>
        <div className="card" style={{height: '100%', padding: '1.5rem'}}>
          <div className="card__header">
            <span style={{fontSize: '1.5rem', marginRight: '0.5rem'}}>{emoji}</span>
            <Heading as="h3" style={{margin: 0}}>{title}</Heading>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center" style={{marginBottom: '2rem'}}>
          <Heading as="h2">Learn about JobHunter07.</Heading>
        </div>
        <div className="row" style={{justifyContent: 'center'}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
