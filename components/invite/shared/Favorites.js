import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as userActions from "../../../redux/actions/userActions";
import FavoritesWidget from "./FavoritesWidget";
import useWindowSize from "../../../hooks/useWindowSize";

function Favorites({ favs, guests, addUserGuest, removeUserGuest, onEnd }) {
  const { height } = useWindowSize();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (favs) {
      let myFavs = favs.map((fav) => {
        let existsInGuests = guests.filter((g) => g.name.trim() === fav.name);
        return { ...fav, selected: existsInGuests.length > 0, favorite: true };
      });
      setFavorites(myFavs);
    }
  }, [favs]);

  const handleOnPressItem = (name) => {
    const fs = favorites.map((item) => ({
      ...item,
      ...(item.name === name ? { selected: !item.selected } : {}),
    }));
    setFavorites(fs);
  };

  const addAndRemoveGuests = () => {
    addUserGuest(favorites.filter((f) => f.selected));
    removeUserGuest(favorites.filter((f) => !f.selected));
  };

  const handleAddItems = () => {
    addAndRemoveGuests();
    onEnd();
  };

  return (
    <div className="w-full p-6" style={{ height: height * 0.75 || 0 }}>
      <FavoritesWidget
        favorites={favorites}
        onPressItem={handleOnPressItem}
        onAddItems={handleAddItems}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    favs: state.user.favs,
    guests: state.user.guests,
  };
}

const mapDispatchToProps = {
  addUserGuest: userActions.addUserGuest,
  removeUserGuest: userActions.removeUserGuests,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
