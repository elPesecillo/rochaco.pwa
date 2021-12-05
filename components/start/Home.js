import React from "react";
import MenuIcon from "../layout/MenuIcon";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

function Home({ menus, setMenuSelected, router }) {
  const { t } = useTranslation();
  const getHomeMenus = (menus = []) => {
    let homeMenus = menus.map((vm) => vm.childMenus.filter((cm) => cm.isHome));
    return [].concat.apply([], homeMenus);
  };

  const handleClick = (e, menu) => {
    e.preventDefault();
    router.push(menu.navigate);
    setMenuSelected({ item: menu.navigate, subItem: menu.screen });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 cursor-pointer">
      {getHomeMenus(menus).map((menu, index) => (
        <div
          key={index}
          style={{ backgroundColor: menu.color }}
          className="card shadow-2xl lg:card-side bg-primary text-primary-content m-3"
          onClick={(e) => handleClick(e, menu)}
        >
          <div className="card-body">
            <p className="text-2xl">{t(menu.label)}</p>
            <div className="justify-end card-actions">
              <button className="btn btn-primary">
                {<MenuIcon screenName={menu.item} />}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

Home.propTypes = {
  menus: PropTypes.array,
  setMenuSelected: PropTypes.func,
  router: PropTypes.object,
};

export default Home;
