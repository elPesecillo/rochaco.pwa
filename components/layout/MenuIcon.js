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
  FaRegQuestionCircle,
} from "react-icons/fa";

function MenuIcon({ screenName, size = 16, className = "" }) {
  const getIcon = () => {
    switch (screenName?.toLowerCase()) {
      case "registerfriend":
        return <FaUserFriends size={size} className={className} />;
      case "registerservice":
        return <FaTruck size={size} className={className} />;
      case "myvisits":
        return <FaList size={size} className={className} />;
      case "report":
      case "reports":
        return <FaGripHorizontal size={size} className={className} />;
      case "arriveqr":
      case "arrive":
      case "personalqr":
        return <FaQrcode size={size} className={className} />;
      case "arrivemanual":
        return <FaEdit size={size} className={className} />;
      case "admin":
        return <FaUserPlus size={size} className={className} />;
      case "payments":
        return <FaMoneyCheckAlt size={size} className={className} />;
      case "paymentscontrol":
        return <FaRegCalendarCheck size={size} className={className} />;
      case "start":
      case "home":
        return <FaHome size={size} className={className} />;
      case "invite":
        return <FaPaperPlane size={size} className={className} />;
      case "logout":
        return <FaSignOutAlt size={size} className={className} />;
      case "about":
        return <FaRegQuestionCircle size={size} className={className} />;
      default:
        return <FaIcons size={size} className={className} />;
    }
  };
  return getIcon();
}

export default MenuIcon;
