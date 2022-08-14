import React, { useContext } from "react";

import styles from "./Home.module.scss";
import AppContext from "../../context";
import Card from "../../components/Card";
import SearchField from "../../components/UI/SearchField";

const Home = ({
  searchValue,
  setSearchValue,
  onAddToCart,
  onAddToFavorite,
  onChangeInputValue,
  isLoading,
}) => {
  const { items } = useContext(AppContext);
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderItems = () => {
    return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
      <Card
        key={item ? item.id : index}
        onPlus={(obj) => onAddToCart(obj)}
        onFavorites={(obj) => onAddToFavorite(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <main className={styles.home}>
      <div className={styles.home__top}>
        <h1>
          {searchValue ? `Results for "${searchValue}":` : "All sneakers"}
        </h1>
        <SearchField
          searchValue={searchValue}
          onChange={onChangeInputValue}
          resetInput={() => setSearchValue("")}
        />
      </div>
      <div className={styles.home__sneakers}>{renderItems()}</div>
    </main>
  );
};

export default Home;
