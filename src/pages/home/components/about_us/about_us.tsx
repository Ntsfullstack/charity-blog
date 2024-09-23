import React from 'react';
import styles from './AboutUs.module.scss';
import { useTranslation } from 'react-i18next';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{t('about us')}</h1>
        <p>{t('Reduce social inequality')}</p>
        <p>{t('Volunteering activities help reduce social inequality and build a fair and civilized community. By helping those in need, we can create balance and reduce social distance.')}</p>
        <p>{t('Enhance community unity and cohesion')}</p>
        <p>
          {t('Volunteering activities help enhance community unity and cohesion. When people come together to help others, they build a strong bond and create a sense of belonging to the community.')}
        </p>
        <p>
          {t('Build a spirit of compassion and love')}
        </p>
        <p>
          {t('volunteering activities help spread the spirit of compassion and love in the community. When people participate in this activity together, they experience the joy of helping others')}
        </p>
      </div>
    </div>
  );
}

export default AboutUs;