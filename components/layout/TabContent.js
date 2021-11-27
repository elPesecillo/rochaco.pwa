import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "next-i18next";

function TabContent({ childComponents, selectedMenu }) {
  const { t } = useTranslation();
  const selectedComponent = childComponents.find(
    (child) =>
      child?.key?.toLowerCase() === selectedMenu?.subItem?.toLowerCase()
  )?.component;
  return (
    <>
      {selectedComponent ? (
        selectedComponent
      ) : (
        <div className="grid justify-items-center h-screen w-full">
          <h1 className="text-5xl self-center text-gray-500 my-3">
            {t("text_page_not_found")}
          </h1>
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    selectedMenu: state.layout.selectedMenu,
  };
}

export default connect(mapStateToProps)(TabContent);
