import React from "react";
import PropTypes from "prop-types";
import Drawer from "./Drawer";
import Navbar from "./Navbar";
import BottomTabs from "./BottomTabs";

function Layout({ children }) {
  return (
    <Drawer>
      <Navbar />
      <div className="relative">{children}</div>
      <BottomTabs />
    </Drawer>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
