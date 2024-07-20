import React from "react";
import styles from "./field.module.scss";
import { t } from 'i18next';

const Field: React.FC = () => {
  return (
    <div className={styles.fieldContent}> 
    <h1>{t('main activity')}</h1>
        <div className={styles.fieldContainer}>
      <img
        src="http://quythientam.com/mediacenter//media/images/905/menu/icons/anh1-1558063714.png"
        alt="Field Image"
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
        src="http://quythientam.com/mediacenter//media/images/905/menu/icons/anh2-1558063725.png"
        alt="Field Image"
        className={styles.fieldImage2}
      />

    </div>
    </div>

  );
};

export default Field;
