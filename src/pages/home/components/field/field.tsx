import React from "react";
import styles from "./field.module.scss";
import { useTranslation } from 'react-i18next';
import volunteerImage from '../field/anh1.jpeg'; // Update the path as needed
import socialSecurityImage from '../field/anh2.jpeg'; // Update the path as needed

const Field: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.fieldContent}>
      <h1>{t('main activity')}</h1>
      <div className={styles.fieldContainer}>
        <img
          src={volunteerImage}
          alt={t('volunteer activity')}
          className={styles.fieldImage}
        />
        <div className={styles.fieldText}>
          <h2>{t('volunteer activity')}</h2>
          <h3>{t('social solving')}</h3>
          <p>{t('Volunteering is a noble form of service, focusing on caring, helping, and sharing with those facing difficulties in life. What is particularly special about volunteering is that it not only brings benefits to the recipients but also greatly enriches the lives of the volunteers themselves.')}</p>
        </div>
      </div>
      <div className={styles.fieldContainer2}>
        <div className={styles.fieldText2}>
          <h2>{t('Social security')}</h2>
          <h3>{t('social solving')}</h3>
          <p>{t('Volunteering is a noble form of service, focusing on caring, helping, and sharing with those facing difficulties in life. What is particularly special about volunteering is that it not only brings benefits to the recipients but also greatly enriches the lives of the volunteers themselves.')}</p>
        </div>
        <img
          src={socialSecurityImage}
          alt={t('Social security')}
          className={styles.fieldImage2}
        />
      </div>
    </div>
  );
};

export default Field;