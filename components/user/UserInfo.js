import React from "react";
import { connect } from "react-redux";
import { Images } from "../../constants";
import PropTypes from "prop-types";

function UserInfo({ user }) {
  let profileImage = user?.photoUrl ?? Images.AvatarBlank?.default?.src;
  return (
    <div className="flex pl-3 pr-3">
      <div className="flex-3">
        <div className="avatar">
          <div className="rounded-full w-12 h-12 m-1">
            <img src={profileImage} />
          </div>
        </div>
      </div>
      <div className="flex-1 pl-2 pt-1">
        <div className="font-semibold">{user?.name}</div>
        <div className="font-light">{user?.suburb?.name}</div>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
  };
};

export default connect(mapStateToProps)(UserInfo);
