import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import * as authCommons from "../server/Utils/authCommons";
import * as userAction from "../redux/actions/userActions";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import * as suburbConfigActions from "../redux/actions/suburbConfigActions";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import TabContent from "../components/layout/TabContent";
import * as layoutActions from "../redux/actions/layoutActions";
import Home from "../components/start/Home";
import PersonalQR from "../components/start/PersonalQR";

export async function getServerSideProps(ctx) {
  return await authCommons.isValidPage(ctx, serverSideTranslations);
}

const Start = function ({
  user,
  getUserInfo,
  loadSuburbConfig,
  menus,
  setMenuSelected,
}) {
  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    if (user) loadSuburbConfig(user.suburb.id);
  }, [user]);
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Layout>
      {
        <TabContent
          childComponents={[
            {
              component: (
                <Home
                  menus={menus}
                  setMenuSelected={setMenuSelected}
                  router={router}
                />
              ),
              key: "home",
            },
            {
              component: <PersonalQR />,
              key: "personalQR",
            },
          ]}
        />
      }
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
  setMenuSelected: layoutActions.setMenuSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
