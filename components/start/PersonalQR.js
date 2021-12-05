import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { connect } from "react-redux";
import { addInvite } from "../../api/AppServiceApi";
import moment from "moment";
import Loading from "../common/Loading";
import UserLimited from "../common/UserLimited";
import useWindowSize from "../../hooks/useWindowSize";

function PersonalQR({ user }) {
  useEffect(() => {
    if (!user?.limited) handleClickGenerate();
  }, []);
  const { height } = useWindowSize();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [qrValue, setQRValue] = useState(null);

  const handleClickGenerate = async () => {
    try {
      let { userId, name, suburb, street } = user;
      let guests = [
        {
          name,
          vehicle: "N/A",
          subject: "Residente",
          favorite: false,
          isService: false,
        },
      ];
      setLoading(true);
      let qrInvite = await addInvite({
        userId,
        userName: name,
        suburbId: suburb.id,
        validFrom: new Date(Date.now()),
        validTo: new Date(moment().add(1, "day")),
        street: street.name,
        streetNumber: street.number,
        guests: guests.map((g) => ({ ...g, subject: g.subject || "privado" })),
        useTimeInterval: false,
        personalQR: true,
      });
      setQRValue(qrInvite);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="h-full">
      {user?.limited && <UserLimited />}
      {!user?.limited && (
        <div
          className="flex flex-col items-center text-center mx-10 justify-center"
          style={{ height: height - 120 }}
        >
          {!loading && qrValue && (
            <img
              className="img-responsive"
              height={300}
              width={300}
              alt="qr value"
              src={qrValue}
            />
          )}
          {loading && <Loading size="xl" />}
          {!qrValue && !loading && (
            <h1 className="text-gray-500">{t("text_generate_qr")}</h1>
          )}
          <div className="my-20">
            <button
              className="btn btn-primary self-end"
              onClick={handleClickGenerate}
              disabled={loading}
            >
              {loading && <Loading size="sm" margin="m-1" />}
              {!qrValue && t("button_qr")}
              {qrValue && t("button_update_qr")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

export default connect(mapStateToProps)(PersonalQR);
