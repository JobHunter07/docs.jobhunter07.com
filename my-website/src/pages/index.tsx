import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { Users, Eye, Palette } from 'lucide-react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          Build the Future of Job Hunting Together
        </Heading>
        <p className={styles.heroSubtitle}>
          JobHunter07 is an open, community-driven employment platform built to empower workers through transparency, ownership, and shared growth.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.ctaButton)}
            to="/docs/about/mission">
            Read the Vision
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.ctaButton)}
            to="/docs/tutorial/intro">
            Get Involved
          </Link>
        </div>
      </div>
    </header>
  );
}

function WhyWeExist() {
  return (
    <section className={styles.whyWeExist}>
      <div className="container">
        <div className={styles.whyContent}>
          <Heading as="h2" className={styles.sectionTitle}>
            Why JobHunter07 Exists
          </Heading>
          <div className={styles.whyText}>
            <p>The hiring process is broken.</p>
            <p>Workers have no ownership.</p>
            <p>Platforms extract value instead of returning it.</p>
            <p className={styles.emphasis}>We're building something different.</p>
            <p className={styles.finalStatement}>
              A community-owned employment platform designed to empower workers — not exploit them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWereBuilding() {
  const features = [
    {
      title: 'Community-Owned Direction',
      description: 'Governance shaped by contributors and supporters.',
      icon: Users,
    },
    {
      title: 'Transparent Development',
      description: 'Open roadmap, open discussions, open decisions.',
      icon: Eye,
    },
    {
      title: 'Shared Design System',
      description: 'A scalable UI system powering all JobHunter07 platforms.',
      icon: Palette,
    },
  ];

  return (
    <section className={styles.whatWereBuilding}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          What We're Building
        </Heading>
        <div className={styles.featureGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <feature.icon size={40} strokeWidth={2} className={styles.featureIcon} />
              <Heading as="h3" className={styles.featureTitle}>
                {feature.title}
              </Heading>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapProgress() {
  const progressItems = [
    { label: 'Design System', progress: 60 },
    { label: 'App MVP', progress: 40 },
    { label: 'Landing Page', progress: 85 },
  ];

  return (
    <section className={styles.roadmapSection}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          Current Progress
        </Heading>
        <div className={styles.progressContainer}>
          {progressItems.map((item, idx) => (
            <div key={idx} className={styles.progressItem}>
              <div className={styles.progressLabel}>
                <span>{item.label}</span>
                <span className={styles.progressPercent}>{item.progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          Join the Movement
        </Heading>
        <div className={styles.communityContent}>
          <ul className={styles.communityList}>
            <li>Open Source & Transparent</li>
            <li>Community-Guided Direction</li>
            <li>Built for Workers</li>
            <li>Designers, Developers & Thinkers Welcome</li>
          </ul>
          <div className={styles.communityButtons}>
            <Link
              className="button button--primary button--lg"
              href="https://github.com/jobhunter07">
              Contribute on GitHub
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/about/faq">
              Join the Discussion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className={styles.bottomCTA}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2" className={styles.ctaTitle}>
            Help Build JobHunter07
          </Heading>
          <p className={styles.ctaText}>
            We're designers, developers, and builders creating something bigger than a job board. 
            If you believe workers deserve ownership and transparency — join us.
          </p>
          <Link
            className="button button--primary button--lg"
            to="/docs/tutorial/intro">
            Start Contributing
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Build the Future of Job Hunting`}
      description="JobHunter07 is an open, community-driven employment platform built to empower workers through transparency, ownership, and shared growth.">
      <HomepageHeader />
      <main>
        <WhyWeExist />
        <WhatWereBuilding />
        <RoadmapProgress />
        <HomepageFeatures />
        <CommunitySection />
        <BottomCTA />
      </main>
    </Layout>
  );
}
