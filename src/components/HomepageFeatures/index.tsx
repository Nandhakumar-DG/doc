import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Ignition Gateway Scripts',
    description: (
      <>
        <b>Gateway scripts</b> in Ignition are Python scripts that run on the Gateway scope rather than in client sessions or Perspective sessions. They execute server-side and are powerful tools for backend automation and system-level operations.
        <br></br>
        <b>Common Types of Gateway Scripts :</b>
        <br></br>
        <b>Gateway Event Scripts</b> - Triggered by specific gateway events like startup, shutdown, tag changes, or timer events. Found in the Gateway Events section of the Designer.
        <br></br>
        <b>Project Library Scripts</b> - Python modules stored in the gateway scope that can be imported and used by other scripts across the gateway.
        <br></br>

        <b>Scheduled Scripts</b> - Scripts that run on a schedule using gateway timer scripts for tasks like data aggregation, reporting, or maintenance.
      </>
    ),
  },
  {
    title: 'Ignition Tag Event Scripts Overview',
    description: (
      <>
        <b>Tag event scripts</b> in Ignition are Python scripts that execute automatically in response to tag-related events. They run on the Gateway and allow you to create reactive, event-driven automation based on tag value changes or quality changes.
        <br></br>
        <b>Types of Tag Event Scripts :</b>
        <br></br>
        <b>Value Change Scripts</b> - Execute whenever the tag's value changes. Useful for triggering actions based on process changes or equipment state transitions.
        <br></br>
        <b>Quality Change Scripts</b> - Fire when the tag's quality changes (Good, Bad, Uncertain). Helpful for detecting communication issues or sensor failures.
        <br></br>
        <b>Alarm Event Scripts</b> - Triggered by alarm state changes (active, cleared, acknowledged). Common for notifications and alarm-driven workflows.
      </>
    ),
  },
  {
    title: 'Ignition Perspective Scripts Overview',
    description: (
      <>
        <b>View scripts</b> in Ignition Perspective are Python scripts that execute in response to events within a View (Perspective's equivalent of a "screen"). These scripts run in the session scope and enable interactive, user-driven functionality in your HMI applications.
        <br></br>
        <b>Types of View Event Scripts :</b>
        <br></br>
        <b>Session-Scoped Execution</b> - View scripts run within individual user sessions in the browser or mobile app, not on the Gateway. Each session has its own script execution context.
        <br></br>
        <b>Event-Driven</b> - Scripts are triggered by user interactions (clicks, inputs) or view lifecycle events (load, unload, property changes).
        <br></br>
        <b>Component-Based</b> - Scripts can be attached to individual components (buttons, dropdowns, containers) or to the view itself.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p className="text--justify">{description}</p>
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
