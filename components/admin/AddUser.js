import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as searchVisitsActions from "../../redux/actions/searchVisitActions";
import { useTranslation } from "next-i18next";
import { getSuburbConfig } from "../../api/AppAdminApi";
import Select from "react-select";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaShare, FaTimes } from "react-icons/fa";
import Loading from "../common/Loading";

function AddUser({
  user,
  suburb,
  suburbInvite,
  streets,
  getUserSuburb,
  addSuburbInvite,
  clearSuburbInvite,
  loadStreets,
}) {
  const { t } = useTranslation();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [street, setStreet] = useState(null);
  const [streetNumber, setStreetNumber] = useState("");
  const [userType, setUserType] = useState(null);
  const [streetsData, setStreetsData] = useState([]);
  const [streetNumbers, setStreetNumbers] = useState([]);
  const userTypeRef = useRef(null);
  const nameRef = useRef(null);
  const streetRef = useRef(null);
  const streetNumberRef = useRef(null);

  useEffect(() => {
    if (user) {
      clearSuburbInvite();
      loadStreetsData();
      getUserSuburb(user?.suburb?.id);
      userTypeRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setStreetsData(streets.streets);
  }, [streets]);

  const loadStreetsData = async () => {
    //over here clean controls
    try {
      setLoading(true);
      await loadStreets(user?.suburb?.id);
      setLoading(false);
      setStreetNumber("");
    } catch (err) {
      setLoading(false);
      console.log("cannot get streets ", err);
    }
  };

  const loadNumbers = async (street) => {
    try {
      setLoading(true);
      setStreetNumbers(
        streetsData && streetsData.length > 0
          ? streetsData.filter((s) => s.street === street)[0]?.numbers
          : []
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("cannot get street numbers", err);
    }
  };

  const userTypes = [
    { value: "neighbor", label: "Vecino" },
    { value: "guard", label: "Guardia" },
  ];

  const handleUserTypeChange = ({ value, label }) => {
    setUserType({ value, label });
    handleClear();
    nameRef.current.focus();
  };

  const handleStreetChange = ({ value, label }) => {
    setStreet({ value, label });
    loadNumbers(value);
  };

  const validateForm = () => {
    let valid = { valid: true, message: "" };
    if (!userType?.value) {
      valid.valid = false;
      valid.message = t("Por favor seleccione un tipo de usuario");
    } else if (name.trim() === "") {
      valid.valid = false;
      valid.message = t("text_mandatory_name");
    } else if (
      !street &&
      (userType?.value === "neighbor" || userType?.value === "suburbAdmin")
    ) {
      valid.valid = false;
      valid.message = t("Por favor seleccione una calle");
    } else if (
      !streetNumber &&
      (userType?.value === "neighbor" || userType?.value === "suburbAdmin")
    ) {
      valid.valid = false;
      valid.message = t("Por favor seleccione un número");
    }
    return valid;
  };

  const handleGenerateInvite = async () => {
    try {
      const val = validateForm();
      if (val.valid) {
        setLoading(true);
        let { suburb } = user;
        await addSuburbInvite(
          suburb.id,
          name,
          street?.value,
          streetNumber?.value,
          userType?.value
        );
        handleClear();
        setLoading(false);
      } else {
        MySwal.fire({
          title: t("text_warning"),
          text: val.message,
          icon: "warning",
        });
      }
    } catch (err) {
      setLoading(false);
      console.log("cannot generate invite", err);
    }
  };

  const handleClear = () => {
    setName("");
    setStreet(null);
    setStreetNumber(null);
    nameRef.current.focus();
  };

  const handleShare = async () => {
    try {
      if (navigator.canShare) {
        await navigator.share({
          text: t("text_suburb_invite", { inviteCode: suburbInvite }),
          title: "Invitación",
        });
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

  const handleCancel = () => {
    handleClear();
    clearSuburbInvite();
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-center text-2xl text-gray-600">{suburb.name}</h1>
      <div className="form-control my-6 md:grid md:grid-cols-3">
        <label className="label hidden md:block md:text-right md:pr-4">
          {t("text_select_user_type")}
        </label>
        <Select
          ref={userTypeRef}
          className="md:col-span-2 input-bordered"
          value={userType}
          onChange={handleUserTypeChange}
          options={userTypes}
          placeholder={t("text_select_user_type")}
        />
      </div>
      <div className="form-control my-3 md:grid md:grid-cols-3">
        <label className="label hidden md:block md:text-right md:pr-4">
          {t("input_name")}
        </label>
        <input
          ref={nameRef}
          className="md:col-span-2 input input-bordered"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={t("input_name")}
        />
      </div>
      {streetsData &&
        streetsData.length > 0 &&
        (userType?.value === "neighbor" ||
          userType?.value === "suburbAdmin") && (
          <div className="form-control my-6 md:grid md:grid-cols-3">
            <label className="label hidden md:block md:text-right md:pr-4">
              {t("text_select_street")}
            </label>
            <Select
              ref={streetRef}
              className="md:col-span-2 input-bordered"
              value={street}
              onChange={handleStreetChange}
              options={streetsData.map((sd) => ({
                value: sd.street,
                label: sd.street,
              }))}
              placeholder={t("text_select_street")}
            />
          </div>
        )}
      {streetNumbers &&
        streetNumbers.length > 0 &&
        (userType?.value === "neighbor" ||
          userType?.value === "suburbAdmin") && (
          <div className="form-control my-6 md:grid md:grid-cols-3">
            <label className="label hidden md:block md:text-right md:pr-4">
              {t("text_select_street_number")}
            </label>
            <Select
              ref={streetNumberRef}
              className="md:col-span-2 input-bordered"
              value={streetNumber}
              onChange={({ value, label }) => setStreetNumber({ value, label })}
              options={streetNumbers.map((sn) => ({
                value: sn,
                label: sn,
              }))}
              placeholder={t("text_select_street_number")}
            />
          </div>
        )}
      {suburbInvite && !loading && (
        <div
          className="bg-white border-2 rounded-lg border-primary text-center p-4 my-8 cursor-pointer lg:mx-60"
          onClick={handleShare}
        >
          <div className="grid grid-cols-4">
            <p className="col-span-3 text-gray-500">{t("button_send_code")}</p>
            <FaShare className="text-primary ml-auto" size={30} />
          </div>
          <p className="text-3xl p-4 text-gray-600">{suburbInvite}</p>
        </div>
      )}

      <div className="md:grid md:grid-cols-2 mt-20">
        <div className="form-control my-3">
          <button
            className="btn btn-primary"
            onClick={handleGenerateInvite}
            disabled={loading}
          >
            {loading && <Loading size="sm" />}
            {!loading && <FaShare className="mr-2" />}
            Generar invitación
          </button>
        </div>
        <div className="form-control my-3">
          <button
            className="btn btn-secondary"
            disabled={loading}
            onClick={handleCancel}
          >
            {loading && <Loading size="sm" />}
            {!loading && <FaTimes className="mr-2" />}
            {t("button_cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    suburb: state.user.suburb,
    suburbInvite: state.user.suburbInvite,
    streets: state.searchVisit.streets,
  };
}

const mapDispatchToProps = {
  getUserSuburb: userActions.getUserSuburb,
  addSuburbInvite: userActions.addSubInvite,
  clearSuburbInvite: userActions.clearSubInvite,
  loadStreets: searchVisitsActions.loadStreets,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
