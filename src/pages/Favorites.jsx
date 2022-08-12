import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import AppContext from "../context";

const Favorites = () => {
  const { favorites, onAddToFavorite } = useContext(AppContext);

  return (
    <div className="content">
      <div className="content__top" style={{ justifyContent: "flex-start" }}>
        <Link to="/">
          <img src="img/back.svg" alt="back" style={{ marginRight: "20px" }} />
        </Link>
        <h1>Favorites</h1>
      </div>
      <div className="sneakers">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorites={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
