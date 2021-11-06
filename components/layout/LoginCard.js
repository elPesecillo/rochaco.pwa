import React from "react";
import PropTypes from "prop-types";
import { Images } from "../../constants";

function LoginCard({ children }) {
  return (
    <div
      className="min-h-screen bg-gray-100 flex justify-center items-center"
      style={{ backgroundImage: `url(${Images.Poly?.default?.src})` }}
    >
      <div className=" bg-white rounded-2xl shadow-xl z-20">
        <div className="bg-primary h-40 items-center px-6 rounded-t-2xl">
          <img
            className="w-full px-14 h-40 object-cover"
            src={Images.LogoWhite.default?.src}
            alt="logo"
          />
        </div>
        <div className="py-12 px-12">{children}</div>
      </div>
    </div>
  );
}

LoginCard.propTypes = {
  children: PropTypes.object.isRequired,
};
export default LoginCard;
