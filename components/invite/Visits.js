import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "next-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UserLimited from "../common/UserLimited";
import * as MyVisitsActions from "../../redux/actions/myVisitsActions";

function Visits({ user, myVisits, loadMyVisits, dropVisit }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [visits, setVisits] = useState([]);
  const [visitInfo, setVisitInfo] = useState(null);
  useEffect(() => {
    let { userId } = user;
    if (userId) {
      loadMyVisits(userId);
    }
  }, []);

  useEffect(() => {
    setVisits(myVisits);
  }, [myVisits]);

  const handleSearch = (e) => {};

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
        className={
          arrived
            ? "w-full border my-3 rounded-md border-l-4 p-3 border-success bg-white grid grid-cols-3"
            : "w-full border my-3 rounded-md border-l-4 p-3 border-primary bg-white grid grid-cols-3"
        }
      >
        <div className="col-span-2">
          <p className="text-2xl text-gray-800">{name}</p>
          <p className="text-gray-400">{vehicle}</p>
          <p className="text-gray-400">{subject || ""}</p>
          <p className="text-gray-400">{arrived ? timeIn : ""}</p>
        </div>
      </div>
    );
    // return (
    //   <pre style={{ textAlign: "left" }}>
    //     {JSON.stringify(visit, null, "  ")}
    //   </pre>
    // );
  };

  return (
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
        {visits.length > 0 && visits.map((visit) => renderVisits(visit))}
      </div>
    </div>
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
