import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import MenuIcon from "./MenuIcon";

function Menu({ menus, setMenuSelected }) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = (e, menu) => {
    e.preventDefault();
    router.push(`/${menu.item}`);
    setMenuSelected({
      item: `/${menu.item}`,
      subItem: menu?.childMenus[0]?.item,
    });
  };
  return (
    <ul className="h-full pb-2">
      {menus?.length > 0 &&
        menus.map((menu, index) => (
          <li key={index}>
            <a href={`/${menu.item}`} onClick={(e) => handleClick(e, menu)}>
              <div className="mx-2">
                <MenuIcon screenName={menu.item} />
              </div>
              {t(menu.label)}
            </a>
          </li>
        ))}
    </ul>
  );
}

Menu.propTypes = {
  menus: PropTypes.array,
  setMenuSelected: PropTypes.func,
};

export default Menu;
