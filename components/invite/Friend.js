import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as inviteActions from "../../redux/actions/inviteActions";
import { useTranslation } from "next-i18next";
import moment from "moment";
import { FaAddressCard, FaShare, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FriendList from "./shared/FriendList";
import { dataUrlToFile } from "../../utils/commons";
import Loading from "../common/Loading";
import Favorites from "./shared/Favorites";

function Friend({
  guests,
  addUserFavs,
  removeUserFavs,
  addUserGuest,
  invite,
  clearInvite,
  userInvite,
  removeUserGuest,
  cleanUserGuests,
  loadUserFavs,
  updateUserGuest,
  user,
}) {
  const { t } = useTranslation();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [switchAccess, setSwitchAccess] = useState(false);
  const [initialDate, setInitialDate] = useState(moment().format("YYYY-MM-DD"));
  const [finalDate, setFinalDate] = useState(
    moment().add(1, "day").format("YYYY-MM-DD")
  );
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    setFriendList(guests || []);
  }, [guests]);

  const toggleSwitch = (type) => {
    switch (type) {
      case "switchAccess":
        setSwitchAccess(!switchAccess);
        break;
    }
  };

  const validateAddFriend = () => {
    let valid = { valid: true, message: "ok" };
    if (name.trim() === "")
      valid = { valid: false, message: t("text_mandatory_name") };

    let exists = friendList.filter((f) => f.name.trim() === name.trim());
    if (exists.length > 0)
      valid = { valid: false, message: t("text_not_valid_name", { name }) };

    return valid;
  };

  const handleAddFriendToList = () => {
    let valid = validateAddFriend();
    if (valid.valid) {
      addUserGuest([
        {
          name: name.trim(),
          vehicle: vehicle.trim(),
          subject: subject.trim(),
          favorite: false,
          isService: false,
        },
      ]);
      setName("");
      setVehicle("");
    } else {
      //show message over here
      MySwal.fire({
        title: t("text_error"),
        text: valid.message,
        icon: "warning",
      });
    }
  };

  const handleAddRemoveFav = (name, vehicle, remove) => {
    let { userId } = user;
    if (remove) {
      removeUserFavs(userId, [{ name }]);
      updateUserGuest({ name, favorite: false });
    } else {
      addUserFavs(userId, [{ name, vehicle }]);
      updateUserGuest({ name, favorite: true });
    }
    loadUserFavs(userId);
  };

  const handleRemoveFromList = (name) => {
    removeUserGuest([{ name }]);
  };

  const validateDates = (initDate, finalDate) => {
    let result = { valid: true, message: "ok" };
    let init = moment(initDate).startOf("day");
    let end = moment(finalDate).startOf("day");
    let current = moment(new Date()).startOf("day");
    if (init > end)
      result = {
        valid: false,
        message: t("valid_date_init_greater_end"),
      };
    if (moment(end).diff(moment(init), "days") > 30)
      result = {
        valid: false,
        message: t("valid_date_range_superior"),
      };
    if (init < current)
      result = {
        valid: false,
        message: t("valid_date_init_greater_current"),
      };

    return result;
  };

  const cleanInputs = () => {
    cleanUserGuests();
    setFriendList([]);
    setName("");
    setVehicle("");
    setSubject("");
    setInitialDate(moment().format("YYYY-MM-DD"));
    setFinalDate(moment().add(1, "day").format("YYYY-MM-DD"));
    setSwitchAccess(false);
  };

  const handleShare = async (validFrom, validTo, useTimeInterval) => {
    try {
      let { userId, name, suburb, street } = user;
      setLoading(true);
      let qr = await invite(
        userId,
        name,
        suburb.id,
        validFrom,
        validTo,
        street.name,
        street.number,
        guests.map((g) => ({ ...g, subject: g.subject || "privado" })),
        useTimeInterval
      );
      let favs = guests.filter((g) => g.favorite);
      if (favs.length > 0) {
        addUserFavs(userId, favs);
      }
      onShare(qr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleSharePress = () => {
    if (friendList.length === 0 || name.trim() !== "") handleAddFriendToList();
    if (friendList.length > 0) {
      let val = validateDates(initialDate, finalDate);
      if (val.valid) {
        handleShare(initialDate, finalDate, switchAccess);
        cleanInputs();
      } else {
        MySwal.fire({
          title: t("text_error"),
          text: val.message,
          icon: "warning",
        });
      }
    }
  };

  // const openShareModal = async (userInvite) => {
  //   try {
  //     setLoading(true);
  //     await onShare(userInvite);
  //     // open modal over here
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };

  const onShare = async (dataUrl) => {
    try {
      const file = await dataUrlToFile(dataUrl, "invite.png");
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Invitación" });
      } else {
        MySwal.fire({
          title: t("text_error"),
          text: "tu navegador no soporta esta funcionalidad, puedes tomar una captura de pantalla y compartirla",
          icon: "warning",
        });
      }
    } catch (err) {
      MySwal.fire({
        title: t("text_error"),
        text:
          err?.message || "Ocurrio un error al intentar compartir el codigo",
        icon: "error",
      });
    }
  };

  const shareCompleted = () => {
    clearInvite();
    cleanUserGuests();
  };

  const handleCloseModal = () => {
    setShowFavorites(false);
  };

  return (
    <>
      <div className="w-full p-6">
        <div className="form-control my-3 md:grid md:grid-cols-3">
          <label className="label hidden md:block md:text-right md:pr-4">
            {t("input_subject")}
          </label>
          <input
            type="text"
            placeholder={t("input_subject")}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input input-bordered  md:col-span-2"
          />
        </div>
        <div className="grid grid-cols-3">
          <div className="form-control my-3 col-span-2 md:grid md:grid-cols-3">
            <label className="label hidden md:block md:text-right md:pr-4">
              {t("input_name_guest")}
            </label>
            <input
              type="text"
              placeholder={t("input_name_guest")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered md:col-span-2"
            />
          </div>
          <button
            className="btn btn-primary my-3 mx-1 text-2xs"
            onClick={() => setShowFavorites(true)}
          >
            {t("text_select_favorites")}
          </button>
        </div>
        <div className="form-control my-3  md:grid md:grid-cols-3">
          <label className="label hidden md:block md:text-right md:pr-4">
            {t("input_vehicle")}
          </label>
          <input
            type="text"
            placeholder={t("input_vehicle")}
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="input input-bordered md:col-span-2"
          />
        </div>
        <div className="form-control my-3 md:my-0 grid grid-cols-3">
          <p className="label text-gray-400 text-sm py-1 col-span-2">
            {t("text_temp_access")}
          </p>
          <input
            checked={switchAccess}
            onChange={() => toggleSwitch("switchAccess")}
            type="checkbox"
            className="toggle toggle-primary place-self-end"
          />
        </div>
        <div className={switchAccess ? "block" : "hidden"}>
          <div className="form-control my-3 md:my-0">
            <label className="label text-gray-500 text-sm">
              {t("input_start_date")}
            </label>
            <input
              type="date"
              placeholder={t("input_start_date")}
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control my-3 md:my-0">
            <label className="label text-gray-500 text-sm">
              {t("input_end_date")}
            </label>
            <input
              type="date"
              placeholder={t("input_end_date")}
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="my-3">
          {friendList.length === 0 && (
            <div className="text-center p-10 justify-items-center">
              <p className="text-gray-500">{t("text_add_at_least_user")}</p>
            </div>
          )}
          {friendList.length > 0 && (
            <FriendList
              friends={friendList}
              onRemovePress={handleRemoveFromList}
              onAddFav={handleAddRemoveFav}
            />
          )}
        </div>
        <div className="md:grid md:grid-cols-3">
          <div className="form-control m-3">
            <button
              className="btn btn-primary"
              onClick={handleAddFriendToList}
              disabled={loading}
            >
              {loading && <Loading size="sm" />}
              {!loading && <FaAddressCard className="mx-2" />}
              {t("button_add_to_list")}
            </button>
          </div>

          <div className="form-control m-3">
            <button
              className="btn btn-success"
              onClick={handleSharePress}
              disabled={loading}
            >
              {loading && <Loading size="sm" />}
              {!loading && <FaShare className="mx-2" />}
              {t("button_rec_and_send")}
            </button>
          </div>
          <div className="form-control m-3">
            <button
              className="btn btn-secondary"
              onClick={cleanInputs}
              disabled={loading}
            >
              {loading && <Loading size="sm" />}
              {!loading && <FaTimes className="mx-2" />}
              {t("button_cancel")}
            </button>
          </div>
        </div>
      </div>
      <div
        id="shareModal"
        className={
          userInvite !== null && userInvite !== ""
            ? "modal modal-open"
            : "modal"
        }
      >
        <div className="modal-box ">
          <h1 className="text-3xl text-center text-gray-500 my-3">
            {t("text_share_again")}
          </h1>
          <div className="">
            <img src={userInvite} alt="invite" />
          </div>
          <div className="modal-action p-6">
            <div className="form-control w-full my-3">
              <button
                className="btn btn-primary"
                onClick={() => onShare(userInvite)}
              >
                {loading && <Loading size="sm" />}
                {!loading && <FaShare className="mx-2" />}
                {t("button_share")}
              </button>
            </div>
            <div className="form-control w-full my-3">
              <button className="btn btn-secondary" onClick={shareCompleted}>
                {loading && <Loading size="sm" />}
                {!loading && <FaTimes className="mx-2" />}
                {t("button_close")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="favModal"
        className={showFavorites ? "modal modal-open" : "modal"}
      >
        <div className="modal-box">
          <div className="w-full text-right">
            <button
              className="btn btn-secondary btn-sm h-10 rounded-full"
              onClick={handleCloseModal}
            >
              <FaTimes size={16} />
            </button>
          </div>
          <Favorites onEnd={handleCloseModal} />
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    guests: state.user.guests,
    userInvite: state.userInvite,
  };
}

const mapDispatchToProps = {
  addUserGuest: userActions.addUserGuest,
  removeUserGuest: userActions.removeUserGuests,
  addUserFavs: userActions.addUserFavs,
  cleanUserGuests: userActions.cleanUserGuests,
  invite: inviteActions.invite,
  clearInvite: inviteActions.cleanInvite,
  loadUserFavs: userActions.loadUserFavs,
  removeUserFavs: userActions.removeUserFavs,
  updateUserGuest: userActions.updateUserGuest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Friend);
