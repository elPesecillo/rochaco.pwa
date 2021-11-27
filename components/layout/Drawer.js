import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as layoutActions from "../../redux/actions/layoutActions";
import { Images } from "../../constants";
import UserInfo from "../user/UserInfo";
import { useTranslation } from "next-i18next";
import Menu from "./Menu";
import MenuIcon from "./MenuIcon";

function Drawer({
  children,
  menuCollapsed,
  toggleMenu,
  menus,
  setMenuSelected,
}) {
  const { t } = useTranslation();
  return (
    <div className=" shadow bg-base-200 drawer min-h-screen">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        onChange={() => toggleMenu(menuCollapsed)}
        checked={menuCollapsed}
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div className="menu overflow-y-auto w-80 bg-base-100 text-base-content">
          <div
            className="bg-primary mb-5 p-6 text-white grid grid-cols-12"
            style={{
              backgroundImage: `url(${Images.BgPattern?.default?.src})`,
            }}
          >
            <div className="col-span-2 h-16 w-1/4"></div>
            <img
              src={Images.LogoWhite?.default?.src}
              className="col-span-8 h-16 w-full object-cover md:object-center"
              alt="background pattern"
            />
          </div>
          <UserInfo />
          <Menu menus={menus} setMenuSelected={setMenuSelected} />
          <ul>
            <li>
              <a
                onClick={() => {
                  window.location.href = "/auth/logout";
                }}
              >
                <div className="mx-2">
                  <MenuIcon screenName={"logout"} />
                </div>
                {t("menu_logout")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

Drawer.propTypes = {
  children: PropTypes.array.isRequired,
  menuCollapsed: PropTypes.bool,
  toggleMenu: PropTypes.func.isRequired,
  setMenuSelected: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    menuCollapsed: state.layout.menuCollapsed,
    menus: state.suburbConfig?.menus,
  };
}

const mapDispatchToProps = {
  toggleMenu: layoutActions.toggleMenu,
  setMenuSelected: layoutActions.setMenuSelected,
};
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
