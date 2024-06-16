import React from 'react';
import Field from '../components/field';
import styles from './MainPage.module.scss';
import AboutUs from '../components/about_us/about_us';

const MainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Field />
      <AboutUs />

    </div>
  );
};

export default MainPage;
