import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import FavoriteItem from "./FavoriteItem";

function FavoritesWidget({ favorites, onPressItem, onAddItems }) {
  const { t } = useTranslation();
  const [filteredFavs, setFilteredFavs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredFavs(favorites);
  }, [favorites]);

  const handleSearch = (event) => {
    let { value } = event.target;
    setSearch(value);
    let filter =
      value.trim() !== ""
        ? favorites.filter((f) =>
            f.name.toLowerCase().includes(value.toLowerCase())
          )
        : favorites;
    setFilteredFavs(filter);
  };

  const checkSelected = () => {
    let sel = favorites.filter((item) => item.selected);
    return sel.length > 0;
  };

  return (
    <div className="w-full">
      <div className="form-control my-3 md:my-0">
        <label className="label hidden md:block">{t("text_fav_search")}</label>
        <input
          type="text"
          className="input input-bordered"
          placeholder={t("text_fav_search")}
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="p-1 w-full">
        {checkSelected() && (
          <div className="form-control my-3 md:my-0">
            <button className="btn btn-primary" onClick={onAddItems}>
              {t("text_add_favs_to_list")}
            </button>
          </div>
        )}
        <div className="w-full">
          {filteredFavs?.length > 0 &&
            filteredFavs.map((fav, idx) => (
              <FavoriteItem
                key={idx}
                name={fav.name}
                vehicle={fav.vehicle}
                selected={fav.selected}
                onPressItem={onPressItem}
              />
            ))}
          {filteredFavs?.length === 0 && (
            <div className="">
              <p className="text-center text-gray-600">
                {t("text_no_favorites")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritesWidget;
