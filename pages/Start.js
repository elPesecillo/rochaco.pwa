import Head from "next/head";
import Image from "next/image";
import { connect } from "react-redux";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/Layout";
import * as authCommons from "../server/Utils/authCommons";
import * as userAction from "../redux/actions/userActions";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import * as suburbConfigActions from "../redux/actions/suburbConfigActions";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import MenuIcon from "../components/layout/MenuIcon";

export async function getServerSideProps(ctx) {
  let { req, locale } = ctx;
  const { token, user } = req.session;
  const tokenValid = authCommons.isValidToken(token);
  const translations = await serverSideTranslations(locale);
  return !tokenValid
    ? {
        redirect: {
          destination: "/auth/Login",
          permanent: false,
        },
      }
    : { props: { user, ...translations } };
}

const Home = function ({ user, getUserInfo, loadSuburbConfig, menus }) {
  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    if (user) loadSuburbConfig(user.suburb.id);
  }, [user]);
  const { t } = useTranslation();
  const router = useRouter();

  const getHomeMenus = (menus = []) => {
    let homeMenus = menus.map((vm) => vm.childMenus.filter((cm) => cm.isHome));
    return [].concat.apply([], homeMenus);
  };

  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 cursor-pointer">
        {getHomeMenus(menus).map((menu, index) => (
          <div
            key={index}
            style={{ backgroundColor: menu.color }}
            className="card shadow-2xl lg:card-side bg-primary text-primary-content m-3"
            onClick={(e) => handleClick(e, menu.navigate)}
          >
            <div className="card-body">
              <p className="text-2xl">{t(menu.label)}</p>
              <div className="justify-end card-actions">
                <button className="btn btn-primary">
                  {<MenuIcon screenName={menu.item} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
  menus: state.suburbConfig.menus,
});

const mapDispatchToProps = {
  getUserInfo: userAction.getUserInfo,
  loadSuburbConfig: suburbConfigActions.loadSuburbConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
