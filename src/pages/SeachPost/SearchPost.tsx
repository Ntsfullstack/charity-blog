import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { useLocation } from "react-router-dom";
import styles from "./SearchPost.module.scss";
const SearchPost = (props: any) => {
  const location = useLocation();
  const searchData = location.state.data;
  const [loading, setLoading] = useState();
  if (searchData.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className={styles.cardContainer}>
      <Card cardData={searchData} loading={false} />
    </div>
  );
};

export default SearchPost;
