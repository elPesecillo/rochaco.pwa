import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import useWindowSize from "../../hooks/useWindowSize";

function TabContent({ childComponents, selectedMenu }) {
  const { t } = useTranslation();
  const { height } = useWindowSize();
  const selectedComponent = childComponents.find(
    (child) =>
      child?.key?.toLowerCase() === selectedMenu?.subItem?.toLowerCase()
  )?.component;
  return (
    <>
      {selectedComponent ? (
        selectedComponent
      ) : (
        <div
          className="grid justify-items-center w-full"
          style={{ height: height - 120 }}
        >
          <h1 className="text-4xl self-center text-center text-gray-500 my-3">
            {t("text_page_not_found")}
          </h1>
        </div>
      )}
    </>
  );
}

TabContent.propTypes = {
  childComponents: PropTypes.array,
  selectedMenu: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    selectedMenu: state.layout.selectedMenu,
  };
}

export default connect(mapStateToProps)(TabContent);
