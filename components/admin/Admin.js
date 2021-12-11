import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "next-i18next";
import * as AdminActions from "../../redux/actions/adminActions";
import Loading from "../common/Loading";
import { FaCircle } from "react-icons/fa";
import ManageUsers from "./shared/ManageUsers";
import { FaTimes } from "react-icons/fa";

function Admin({
  user,
  addresses,
  setEnabledDisabledUser,
  limitedUsersByAddress,
  loadAddressesWithUsersStates,
}) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showManageUsers, setShowManageUsers] = useState(false);

  useEffect(() => {
    const { suburb } = user;
    console.log("suburb", suburb);
    setLoading(true);
    loadAddressesWithUsersStates(suburb.id)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredAddresses(addresses);
    if (selectedAddress) {
      setSelectedAddress(
        addresses.find((a) => a?.address?._id === selectedAddress?.address?._id)
      );
    }
  }, [addresses]);

  const handleSearch = (value) => {
    setSearch(value);
    setFilteredAddresses(
      addresses.filter((a) =>
        `${a?.address?.name} ${a?.address?.number}`
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setShowManageUsers(true);
  };

  const handleCloseModal = () => {
    setShowManageUsers(false);
    setSelectedAddress(null);
  };

  const renderAddress = (item) => {
    return (
      <div
        key={item?.address?._id}
        className="grid grid-cols-7 bg-white m-4 p-4 rounded-lg border-2 border-gray-100"
        onClick={() => handleSelectAddress(item)}
      >
        <div className="col-span-4">
          <p className="text-gray-600">{`${item?.address?.name} ${item?.address?.number}`}</p>
          <p className="text-xs text-gray-400 my-3">{`${t("text_users")} ${
            item.users.length
          }`}</p>
        </div>
        <div className="align-right col-span-3 grid grid-cols-3">
          {item?.users?.some((u) => u.active) ? (
            <>
              <label className="text-2xs col-span-2 text-right my-auto">
                {t("text_active_users")}
              </label>
              <FaCircle className="text-green-500 m-auto" />
            </>
          ) : (
            <>
              <label className="text-2xs col-span-2 text-right my-auto">
                {t("text_inactive_users")}
              </label>
              <FaCircle className="text-red-500 m-auto" />
            </>
          )}
          {!item?.users?.every((u) => u.limited) ? (
            <>
              <label className="text-2xs col-span-2 text-right my-auto">
                {t("text_complete_access")}
              </label>
              <FaCircle className="text-green-500 m-auto" />
            </>
          ) : (
            <>
              <label className="text-2xs col-span-2 text-right my-auto">
                {t("text_limited_access")}
              </label>
              <FaCircle className="text-yellow-500 m-auto" />
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full p-4">
        <div className="form-control md:grid md:grid-cols-3 my-3">
          <label className="label hidden md:block md:text-right md:pr-4">
            {t("text_search_by_address")}
          </label>
          <input
            type="text"
            placeholder={t("text_search_by_address")}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="input input-bordered  md:col-span-2"
          />
        </div>
        <div className="w-full">
          {loading && <Loading margin="m-auto" size="sm" />}
          {filteredAddresses.length > 0 &&
            filteredAddresses.map((a) => renderAddress(a))}
        </div>
      </div>
      <div
        id="manageUsersModal"
        className={showManageUsers ? "modal modal-open" : "modal"}
      >
        <div className="modal-box">
          <div className="w-full">
            <button
              className="btn btn-secondary btn-sm h-10 rounded-full"
              onClick={handleCloseModal}
            >
              <FaTimes size={16} />
            </button>
            <ManageUsers
              user={user}
              users={selectedAddress?.users}
              address={selectedAddress?.address}
              limitedUsersByAddress={limitedUsersByAddress}
              setEnabledDisabledUser={setEnabledDisabledUser}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    addresses: state.admin?.addresses,
  };
}

const mapDispatchToProps = {
  setEnabledDisabledUser: AdminActions.setEnabledDisabledUser,
  limitedUsersByAddress: AdminActions.limitedUsersByAddress,
  loadAddressesWithUsersStates: AdminActions.loadAddressesWithUsersStates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
