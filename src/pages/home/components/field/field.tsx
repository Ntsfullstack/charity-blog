import React, { useEffect, useState } from "react";
import styles from "./field.module.scss";
import { useTranslation } from "react-i18next";
import { FieldData, getField } from "./fideld.api";

const Field: React.FC = () => {
  const { t } = useTranslation();
  const [fields, setFields] = useState<FieldData[]>([]);
  const [posterUrls, setPosterUrls] = useState<string[]>([]);

  useEffect(() => {
    getField().then((res) => {
      setFields(res.data); // res.data là mảng các FieldData
    });
  }, []);

  useEffect(() => {
    // Lấy các URL từ các poster
    const urls = fields.flatMap((field) =>
      field.posters.map((poster) => poster.url)
    );
    setPosterUrls(urls);
  }, [fields]);
  return (
    <div className={styles.fieldContent}>
      <h1>{t("main activity")}</h1>
      <div className={styles.fieldContainer}>
        <img
          src={posterUrls[0]}
          alt={t("volunteer activity")}
          className={styles.fieldImage}
        />
        <div className={styles.fieldText}>
          <h2>{t("volunteer activity")}</h2>
          <h3>{t("social solving")}</h3>
          <p>
            {t(
              "Volunteering is a noble form of service, focusing on caring, helping, and sharing with those facing difficulties in life. What is particularly special about volunteering is that it not only brings benefits to the recipients but also greatly enriches the lives of the volunteers themselves."
            )}
          </p>
        </div>
      </div>
      <div className={styles.fieldContainer2}>
        <div className={styles.fieldText2}>
          <h2>{t("Social security")}</h2>
          <h3>{t("social solving")}</h3>
          <p>
            {t(
              "Volunteering is a noble form of service, focusing on caring, helping, and sharing with those facing difficulties in life. What is particularly special about volunteering is that it not only brings benefits to the recipients but also greatly enriches the lives of the volunteers themselves."
            )}
          </p>
        </div>
        <img
          src={posterUrls[1]}
          alt={t("Social security")}
          className={styles.fieldImage2}
        />
      </div>
    </div>
  );
};

export default Field;
