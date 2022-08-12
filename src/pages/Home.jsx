import React, { useContext } from "react";

import AppContext from "../context";
import Card from "../components/Card";

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
    <div className="content">
      <div className="content__top">
        <h1>
          {searchValue ? `Results for "${searchValue}":` : "All sneakers"}
        </h1>
        <div className="search">
          <img width={14} height={14} src="img/search.svg" alt="search" />
          <input
            value={searchValue}
            onChange={onChangeInputValue}
            placeholder="Search..."
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear"
              src="img/removeHover.svg"
              alt="clear"
            />
          )}
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  );
};

export default Home;
