import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Images } from "../../constants";
import * as layoutActions from "../../redux/actions/layoutActions";

function Navbar({ toggleMenu, menuTitle, menuCollapsed, user }) {
  let profileImage = user?.photoUrl ?? Images.AvatarBlank?.default?.src;
  return (
    <div className="navbar mb-2 shadow-lg bg-primary text-neutral-content sticky top-0 z-50">
      <div className="flex-1 lg:flex">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => toggleMenu(menuCollapsed)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <div className="w-24 h-14">
          <img
            src={Images.LogoWhite?.default?.src}
            className="object-cover h-14 w-full"
            alt="logo neighby"
          />
        </div>
      </div>
      <div className="flex-1 hidden px-2 mx-2 lg:flex">{menuTitle}</div>

      <div className="flex-none">
        <div className="avatar">
          <div className="rounded-full w-10 h-10 m-1">
            <img src={profileImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  toggleMenu: PropTypes.func,
  menuCollapsed: PropTypes.bool,
  menuTitle: PropTypes.string,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.user.data,
    menuTitle: state.layout.menuTitle,
    menuCollapsed: state.layout.menuCollapsed,
  };
}

const mapDispatchToProps = {
  toggleMenu: layoutActions.toggleMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
