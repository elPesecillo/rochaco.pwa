import React, { useEffect, useState } from "react";
import { Images } from "../../constants";
import { useTranslation } from "next-i18next";
import LoginCard from "../../components/layout/LoginCard";
import { LoadScriptByURL } from "../../utils/commons";
import Swal from "sweetalert2";
import Base64 from "base-64";
import { isPasswordTemporary } from "../../api/AppAdminApi";
import Api from "../../api/ApiService";
import { useRouter } from "next/router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

function Login() {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // load the script by passing the URL
    LoadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_WEB}`,
      function () {
        console.log("Script loaded!");
      }
    );
  }, []);

  const getCaptcha = () => {
    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_WEB, { action: "submit" })
          .then((token) => {
            resolve(token);
          })
          .catch((error) => reject(error));
      });
    });
  };

  const routeChange = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const token = await getCaptcha();
      window.location = `${window.location.origin}/auth/facebook?captcha=${token}`;

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: t("error"),
        text: t("error_message"),
        icon: "error",
      });
    }
  };

  const handleSignIn = async (user, password) => {
    try {
      setLoading(true);
      const isTemporary = await isPasswordTemporary(
        user,
        Base64.encode(password)
      );
      const token = await getCaptcha();
      await Api.post("/auth/byUsrPwd", {
        user,
        password: Base64.encode(password),
        captchaToken: token,
      });
      setLoading(false);
      router.push("/Home");
    } catch (ex) {
      console.log(ex);
      setLoading(false);
      Swal.fire({
        title: t("text_error"),
        text: ex.message ? ex.message.message : "error de autenticacion",
        icon: "error",
      });
    }
  };

  return (
    <LoginCard>
      <>
        <div>
          <p className="text font-thin text-center mb-4 cursor-pointer">
            {t("text_signin_with")}
          </p>
        </div>
        <div className="space-y-4">
          <button
            className="btn btn-primary btn-outline w-full"
            onClick={routeChange}
          >
            <img
              className="h-6"
              src={Images.FacebookLogo?.default?.src}
              alt="facebook logo"
            />
            {!loading ? t("button_signin_facebook") : t("text_loading")}
          </button>

          <p className="text font-thin text-center mb-4 cursor-pointer">
            {t("text_signin_classic")}
          </p>
          <div className="form-control">
            <input
              type="text"
              placeholder={t("input_email")}
              className="input input-bordered"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder={t("input_password")}
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="my-4 text-sm">
            <span className="text-blue-500 cursor-pointer">
              {t("text_forgot_password")}
            </span>
          </p>
          <button
            className="py-3 btn btn-primary w-full"
            onClick={() => handleSignIn(user, password)}
          >
            {!loading ? t("button_signin") : t("text_loading")}
          </button>
          <p className="mt-4 text-sm">
            <span className="text-blue-500 cursor-pointer">
              {t("text_signin_here")}
            </span>
          </p>
        </div>
      </>
    </LoginCard>
  );
}

// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }
// const mapDispatchToProps = {
//   setPasswordTemporary: userActions.setPasswordTemporary,
//   savePasswordTemporary: userActions.savePasswordTemporary,
// };

export default Login;
