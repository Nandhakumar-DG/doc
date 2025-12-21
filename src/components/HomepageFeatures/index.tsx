import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Repositories (Repos)',
    Svg: require('@site/static/img/Repositories (Repos).svg').default,
    description: (
      <>
        A repository is the main container for a project on GitHub.
        It stores source code, files, folders, and the complete history of changes.
        Repositories allow developers to track versions, collaborate with others, and manage a project in one place.
      </>
    ),
  },
  {
    title: 'Branches & Commits',
    Svg: require('@site/static/img/Branches & Commits.svg').default,
    description: (
      <>
        Branches allow developers to work on new features or fixes without affecting the main codebase.
        They make it possible to develop, test, and experiment safely in parallel.
      </>
    ),
  },
  {
    title: 'Collaboration (Pull Requests)',
    Svg: require('@site/static/img/Collaboration (Pull Requests).svg').default,
    description: (
      <>
        Pull Requests (PRs) are used to propose and review changes before merging them into the main branch.
        They allow team members to discuss code, request improvements, and approve changes.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
