import { useState, useRef } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as inviteActions from "../../redux/actions/inviteActions";
import * as userActions from "../../redux/actions/userActions";
import { useTranslation } from "next-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UserLimited from "../common/UserLimited";
import { FaTimes, FaCheck } from "react-icons/fa";
import Loading from "../common/Loading";

function Service({ invite, user, clearInvite }) {
  const { t } = useTranslation();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [plates, setPlates] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const providerRef = useRef(null);
  const handleSave = async () => {
    try {
      const val = validateData();
      if (val.valid) {
        let { userId, name, suburb, street } = user;
        let initialDate = moment().format("YYYY-MM-DD");
        let finalDate = moment().add(1, "day").format("YYYY-MM-DD");
        setLoading(true);
        await invite(
          userId,
          name,
          suburb.id,
          initialDate,
          finalDate,
          street.name,
          street.number,
          [
            {
              name: provider,
              vehicle,
              plates,
              isService: true,
              aditionalInformation: additionalInfo,
            },
          ]
        );
        setLoading(false);
        handleCancel();
        clearInvite();
        MySwal.fire({
          title: t("text_successful"),
          text: "Los datos fueron registrados correctamente.",
          icon: "success",
        });
      } else {
        MySwal.fire({
          title: t("text_error"),
          text: val.message,
          icon: "warning",
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProvider("");
    setVehicle("");
    setPlates("");
    setAdditionalInfo("");
    providerRef.current.focus();
  };

  const validateData = () => {
    let valid = { valid: true, message: "ok" };
    if (provider.trim() === "")
      valid = { valid: false, message: t("valid_provider_mandatory") };
    return valid;
  };

  return (
    <>
      {user.limited && <UserLimited />}
      {!user.limited && (
        <div className="w-full p-6">
          <div className="form-control my-3 md:grid md:grid-cols-3">
            <label className="label hidden md:block md:text-right md:pr-4">
              {t("input_provider")}
            </label>
            <input
              type="text"
              ref={providerRef}
              placeholder={t("input_provider")}
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="input input-bordered  md:col-span-2"
            />
          </div>
          <div className="form-control my-3 md:grid md:grid-cols-3">
            <label className="label hidden md:block md:text-right md:pr-4">
              {t("input_vehicle")}
            </label>
            <input
              type="text"
              placeholder={t("input_vehicle")}
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="input input-bordered  md:col-span-2"
            />
          </div>
          <div className="form-control my-3 md:grid md:grid-cols-3">
            <label className="label hidden md:block md:text-right md:pr-4">
              {t("input_plates")}
            </label>
            <input
              type="text"
              placeholder={t("input_plates")}
              value={plates}
              onChange={(e) => setPlates(e.target.value)}
              className="input input-bordered  md:col-span-2"
            />
          </div>
          <div className="form-control my-3 md:grid md:grid-cols-3">
            <label className="label hidden md:block md:text-right md:pr-4">
              {t("input_aditional_info")}
            </label>
            <input
              type="text"
              placeholder={t("input_aditional_info")}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="input input-bordered  md:col-span-2"
            />
          </div>
          <div className="md:grid md:grid-cols-2 mt-12">
            <div className="form-control m-3">
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={loading}
              >
                {loading && <Loading size="sm" />}
                {!loading && <FaCheck className="mx-2" />}
                {t("button_register")}
              </button>
            </div>
            <div className="form-control m-3">
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                {loading && <Loading size="sm" />}
                {!loading && <FaTimes className="mx-2" />}
                {t("button_cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

const mapDispatchToProps = {
  invite: inviteActions.invite,
  clearInvite: inviteActions.cleanInvite,
  loadUserFavs: userActions.loadUserFavs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
