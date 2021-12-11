import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import Loading from "../../common/Loading";

function ManageUsers({
  user,
  users,
  address,
  limitedUsersByAddress,
  setEnabledDisabledUser,
}) {
  const { t } = useTranslation();
  const [limited, setLimited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState([]);

  useEffect(() => {
    setLimited(users?.some((u) => u.limited));
    setLoadingUser(
      users?.map((u) => ({
        id: u.id,
        loading: loadingUser?.find((f) => f.id === u.id)
          ? loadingUser?.find((f) => f.id === u.id).loading
          : false,
      })) || []
    );
  }, [users]);

  const handleSetLimited = () => {
    let { suburb } = user;
    setLimited(!limited);
    setLoading(true);
    limitedUsersByAddress(suburb.id, address._id, !limited)
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        console.log("error al actualizar", err);
      });
  };

  const handleUserActiveChange = async (user) => {
    setLoadingUser(
      users.map((u) => (u.id ? { id: user.id, loading: true } : { ...u }))
    );
    setEnabledDisabledUser(user.id, !user.active)
      .then(() =>
        setLoadingUser(
          users.map((u) => (u.id ? { id: user.id, loading: false } : { ...u }))
        )
      )
      .catch((err) => {
        console.log(err);
        setLoadingUser(
          users.map((u) => (u.id ? { id: user.id, loading: false } : { ...u }))
        );
      });
  };

  const renderUsers = (user) => {
    return (
      <div key={user.id} className="form-control grid grid-cols-2 my-5">
        <label className="text-sm text-gray-500">{user.name}</label>
        {loadingUser?.find((u) => u.id === user.id)?.loading && (
          <Loading size="sm" margin="ml-auto" />
        )}
        {!loadingUser?.find((u) => u.id === user.id)?.loading && (
          <input
            checked={user.active}
            onChange={() => handleUserActiveChange(user)}
            type="checkbox"
            className="toggle toggle-accent toggle-sm place-self-end"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <h1 className="text-xl text-gray-600 text-center">{`${address?.name} ${address?.number}`}</h1>
      <div className="form-control grid grid-cols-2 my-8">
        <label className="label text-gray-600 pr-4">
          {!limited ? t("text_complete_access") : t("text_limited_access")}
        </label>
        {loading && <Loading  margin="ml-auto" />}
        {!loading && (
          <input
            checked={!limited}
            onChange={() => handleSetLimited()}
            type="checkbox"
            className="toggle toggle-primary place-self-end"
          />
        )}
      </div>
      <div className="w-full my-3">
        {users?.length > 0 && users?.map((user) => renderUsers(user))}
      </div>
    </>
  );
}

export default ManageUsers;
