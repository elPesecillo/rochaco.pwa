import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import MenuIcon from "./MenuIcon";

function Menu({ menus }) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <ul className="h-full pb-2">
      {menus?.length > 0 &&
        menus.map((menu, index) => (
          <li key={index}>
            <a
              href={`/${menu.item}`}
              onClick={(e) => handleClick(e, `/${menu.item}`)}
            >
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

export default Menu;
