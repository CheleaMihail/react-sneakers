import React from "react";

import styles from "./SearchField.module.scss";

const SearchField = ({ searchValue, onChange, resetInput }) => {
  return (
    <div className={styles.search}>
      <img width={14} height={14} src="img/search.svg" alt="search" />
      <input value={searchValue} onChange={onChange} placeholder="Search..." />
      {searchValue && (
        <img
          onClick={resetInput}
          className={styles.clear}
          src="img/removeHover.svg"
          alt="clear"
        />
      )}
    </div>
  );
};

export default SearchField;
