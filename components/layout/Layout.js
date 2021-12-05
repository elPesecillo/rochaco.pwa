import React from "react";
import PropTypes from "prop-types";
import Drawer from "./Drawer";
import Navbar from "./Navbar";
import BottomTabs from "./BottomTabs";

import useWindowSize from "../../hooks/useWindowSize";

function Layout({ children }) {
  const { height } = useWindowSize();
  return (
    <Drawer>
      <Navbar />
      <div className="relative" style={{ minHeight: height - 120 || 200 }}>
        {children}
      </div>
      <BottomTabs />
    </Drawer>
  );
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
