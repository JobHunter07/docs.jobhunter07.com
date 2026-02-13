import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import { FileText, Target, Heart, HelpCircle, BookOpen } from 'lucide-react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: string;
  link: string;
  Icon: React.ComponentType<any>;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Explore the Platform',
    Icon: FileText,
    description: 'JobHunter07 is a community-run, human-first employment platform ...',
    link: '/docs/about/overview',
  },
  {
    title: 'Understand the Mission',
    Icon: Target,
    description: 'Empowering Workers Through Community Ownership',
    link: '/docs/about/mission',
  },
  {
    title: 'See What We Stand For',
    Icon: Heart,
    description: 'The principles that guide everything we build and every decision we ...',
    link: '/docs/about/values',
  },
  {
    title: 'Got Questions?',
    Icon: HelpCircle,
    description: 'Quick answers to common questions about JobHunter07.',
    link: '/docs/about/faq',
  },
  {
    title: 'Explore Key Terms',
    Icon: BookOpen,
    description: 'Key terms and concepts used throughout JobHunter07 and this docu...',
    link: '/docs/about/glossary',
  },
];

function Feature({title, Icon, description, link}: FeatureItem) {
  return (
    <div style={{flex: '1 1 18%', minWidth: '200px', maxWidth: '250px', marginBottom: '1.5rem', padding: '0 0.5rem'}}>
      <Link to={link} style={{textDecoration: 'none', color: 'inherit'}}>
        <div className="card" style={{
               height: '100%', 
               padding: '1.25rem', 
               transition: 'transform 0.2s, box-shadow 0.2s',
               border: '1px solid var(--ifm-color-emphasis-300)',
               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
               backgroundColor: 'var(--ifm-background-surface-color)'
             }} 
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = 'translateY(-4px)';
               e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'translateY(0)';
               e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
             }}>
          <div className="card__header" style={{paddingBottom: '0.75rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
              <Icon size={24} strokeWidth={2} style={{color: 'var(--ifm-color-primary)', flexShrink: 0}} />
              <Heading as="h3" style={{margin: 0, fontSize: '1rem'}}>{title}</Heading>
            </div>
          </div>
          <div className="card__body" style={{padding: 0}}>
            <p style={{fontSize: '0.875rem', margin: 0, color: 'var(--ifm-color-emphasis-700)'}}>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features} style={{backgroundColor: 'var(--ifm-color-emphasis-100)', padding: '3rem 0'}}>
      <div className="container">
        <div className="text--center" style={{marginBottom: '2.5rem'}}>
          <Heading as="h2">Learn about JobHunter07.</Heading>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', maxWidth: '1400px', margin: '0 auto'}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
