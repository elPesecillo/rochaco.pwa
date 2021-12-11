import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "next-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UserLimited from "../common/UserLimited";
import * as MyVisitsActions from "../../redux/actions/myVisitsActions";
import { FaEllipsisV } from "react-icons/fa";
import Loading from "../common/Loading";
import { getUrlQR } from "../../api/AppServiceApi";
import { dataUrlToFile } from "../../utils/commons";

function Visits({ user, myVisits, loadMyVisits, dropVisit }) {
  const { t } = useTranslation();
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [visits, setVisits] = useState([]);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [visitSelected, setVisitSelected] = useState(null);

  const handleCancel = () => {
    setShowOptionsModal(false);
    setVisitSelected(null);
  };

  const handleShowMenu = (visit) => {
    setShowOptionsModal(true);
    setVisitSelected(visit);
  };

  const handleDrop = async () => {
    try {
      setLoading(true);
      await dropVisit(visitSelected.accessControlId, visitSelected.guestId);
      setLoading(false);
      handleCancel();
    } catch (err) {
      setLoading(false);
      MySwal.fire({
        title: t("text_error"),
        text: err.message || t("text_error"),
        icon: "error",
      });
      console.log(err);
    }
  };

  useEffect(() => {
    let { userId } = user;
    if (userId) {
      setLoading(true);
      loadMyVisits(userId)
        .then(() => setLoading(false))
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    setVisits(myVisits);
  }, [myVisits]);

  const handleSearch = (e) => {
    let { value } = e.target;
    setVisits(
      myVisits.filter((v) => v.name.toLowerCase().includes(value.toLowerCase()))
    );
    setSearch(value);
  };

  const handleShare = async () => {
    try {
      setLoading(true);
      let dataUrl = await getUrlQR(visitSelected.accessControlId);
      setLoading(false);
      await onShare(dataUrl);
      handleCancel();
    } catch (err) {
      setLoading(false);
      MySwal.fire({
        title: t("text_error"),
        text: err.message || t("text_error"),
        icon: "error",
      });
      console.log(err);
    }
  };

  const onShare = async (dataUrl) => {
    try {
      const file = await dataUrlToFile(dataUrl, "invite.png");
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Invitación" });
      } else {
        MySwal.fire({
          title: t("text_error"),
          text: "tu navegador no soporta esta funcionalidad",
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

  const renderVisits = ({
    _id,
    name,
    vehicle,
    subject,
    accessControlId,
    timeIn,
    timeInNormal,
    arrived,
    guestId,
    useTimeInterval,
    validTo,
  }) => {
    return (
      <div
        key={_id}
        className={
          arrived
            ? "w-full border my-3 rounded-md border-l-4 p-3 border-success bg-white grid grid-cols-5"
            : "w-full border my-3 rounded-md border-l-4 p-3 border-primary bg-white grid grid-cols-5"
        }
      >
        <div className="col-span-4">
          <p className="text-2xl text-gray-800">{name}</p>
          <p className="text-gray-400">{vehicle}</p>
          <p className="text-gray-400">{subject || ""}</p>
          <p className="text-gray-400">{arrived ? timeIn : ""}</p>
        </div>

        <div className="text-center h-full">
          {!arrived && (
            <FaEllipsisV
              className="text-gray-500 m-auto my-4 cursor-pointer"
              size={20}
              onClick={() => {
                handleShowMenu({ accessControlId, guestId });
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {user.limited && <UserLimited />}
      {!user.limited && (
        <div className="w-full p-4">
          <div className="form-control my-3 md:my-0">
            <label className="label hidden md:block">
              {t("text_search_visit")}
            </label>
            <input
              type="text"
              className="input input-bordered"
              placeholder={t("text_search_visit")}
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="w-full p-2">
            {loading && (
              <div className="text-center w-full">
                <Loading size="sm" margin="m-auto" />
              </div>
            )}
            {visits.length > 0 && visits.map((visit) => renderVisits(visit))}
          </div>
        </div>
      )}
      <div
        id="optionsModal"
        className={showOptionsModal ? "modal modal-open" : "modal"}
      >
        <div className="modal-box">
          <div className="w-full">
            <div className="form-control my-4">
              <button className="btn btn-primary" onClick={handleShare}>
                {"Compartir codigo QR"}
              </button>
            </div>
            <div className="form-control my-4">
              <button className="btn btn-secondary" onClick={handleDrop}>
                {"Eliminar"}
              </button>
            </div>
            <div className="form-control my-4">
              <button className="btn btn-active" onClick={handleCancel}>
                {t("button_cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    myVisits: state.myVisits,
  };
}

const mapDispatchToProps = {
  loadMyVisits: MyVisitsActions.loadMyVisits,
  dropVisit: MyVisitsActions.dropVisit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Visits);
