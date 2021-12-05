import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import * as layoutActions from "../../redux/actions/layoutActions";
import { useTranslation } from "next-i18next";
import MenuIcon from "./MenuIcon";
import PropTypes from "prop-types";

function BottomTabs({ menus, selectedMenu, setMenuSelected }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [tabMenus, setTabMenus] = useState([]);
  useEffect(() => {
    if (router.route !== selectedMenu?.item) {
      setMenuSelected({
        item: router.route,
        subItem:
          menus?.filter((menu) => `/${menu.item}` === router.route)[0]
            ?.childMenus[0]?.item || "",
      });
    }
  }, [router.pathname]);

  useEffect(() => {
    setTabMenus(
      menus?.filter((menu) => `/${menu.item}` === selectedMenu?.item)[0]
        ?.childMenus || []
    );
  }, [selectedMenu]);

  const handleClickTab = (menu) => {
    setMenuSelected({
      item: router.route,
      subItem: menu.item,
    });
  };

  return (
    <ul className="menu justify-center flex-none w-full p-1 horizontal bg-base-100 sticky bottom-0">
      {tabMenus.length > 0 &&
        tabMenus.map((menu, idx) => (
          <li
            key={idx}
            className="grid grid-cols-1 text-center w-full cursor-pointer"
            onClick={() => handleClickTab(menu)}
          >
            <div className="flex">
              <MenuIcon
                screenName={menu.item}
                className={`${
                  menu?.item === selectedMenu.subItem
                    ? "text-blue-400"
                    : "text-gray-500"
                } block m-auto`}
                size={16}
              />
            </div>
            <p
              className={`${
                menu?.item === selectedMenu.subItem
                  ? "text-blue-400"
                  : "text-gray-500"
              } text-2xs`}
            >
              {t(menu.label)}
            </p>
          </li>
        ))}
    </ul>
  );
}

BottomTabs.propTypes = {
  menus: PropTypes.array,
  selectedMenu: PropTypes.object,
  setMenuSelected: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    selectedMenu: state.layout.selectedMenu,
    menus: state.suburbConfig?.menus,
  };
}

const mapDispatchToProps = {
  setMenuSelected: layoutActions.setMenuSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabs);
