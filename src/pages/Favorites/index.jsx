import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

import styles from "./Favorites.module.scss";
import Card from "../../components/Card";
import Info from "../../components/Info";
import AppContext from "../../context";

const Favorites = () => {
  const { favorites, onAddToFavorite, isLoading } = useContext(AppContext);
  const isFavoritesEmpty = favorites.length < 1;
  const navigate = useNavigate();

  const renderFavorites = () => {
    return favorites.map((item, index) => (
      <Card
        key={index}
        favorited={true}
        onFavorites={onAddToFavorite}
        {...item}
      />
    ));
  };

  const goBack = () => {
    navigate("/react-sneakers/");
  };

  return (
    <div className={isFavoritesEmpty ? styles.containerInfo : styles.container}>
      {isLoading ? (
        <Audio height={100} width={100} color="orange" />
      ) : isFavoritesEmpty ? (
        <Info
          parentStyles={styles.info}
          title={"No bookmarks :("}
          image={"img/info/noFavorites.png"}
          description={"You have not added anything to favorites."}
          btnTitle="Back"
          actionClick={goBack}
        />
      ) : (
        <div className={styles.favorites}>
          <div className={styles.favorites__top}>
            <Link to="/react-sneakers/">
              <img src="img/back.svg" alt="back" />
            </Link>
            <h1>Favorites</h1>
          </div>
          <div className={styles.favorites__list}>{renderFavorites()}</div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
