import React from "react";
import { useTranslation } from "next-i18next";
import useWindowSize from "../../hooks/useWindowSize";
function UserLimited({}) {
  const { t } = useTranslation();
  const { height } = useWindowSize();
  return (
    <div className="flex text-center " style={{ height: height - 120 || 1 }}>
      <div className="w-full m-auto">
        <p className="text-4xl text-yellow-800 my-10">
          {t("text_blocked_function")}
        </p>
        <p className="text-2xl text-yellow-700">{t("text_account_limited")}</p>
      </div>
    </div>
  );
}

export default UserLimited;
