import React from "react";
import {
  FaUserFriends,
  FaIcons,
  FaTruck,
  FaList,
  FaGripHorizontal,
  FaQrcode,
  FaEdit,
  FaUserPlus,
  FaMoneyCheckAlt,
  FaRegCalendarCheck,
  FaHome,
  FaPaperPlane,
  FaSignOutAlt,
} from "react-icons/fa";

function MenuIcon({ screenName }) {
  const getIcon = () => {
    switch (screenName?.toLowerCase()) {
      case "registerfriend":
        return <FaUserFriends />;
      case "registerservice":
        return <FaTruck />;
      case "myvisits":
        return <FaList />;
      case "report":
      case "reports":
        return <FaGripHorizontal />;
      case "arriveqr":
      case "arrive":
        return <FaQrcode />;
      case "arrivemanual":
        return <FaEdit />;
      case "admin":
        return <FaUserPlus />;
      case "payments":
        return <FaMoneyCheckAlt />;
      case "paymentscontrol":
        return <FaRegCalendarCheck />;
      case "start":
        return <FaHome />;
      case "invite":
        return <FaPaperPlane />;
      case "logout":
        return <FaSignOutAlt />;
      default:
        return <FaIcons />;
    }
  };
  return getIcon();
}

export default MenuIcon;
