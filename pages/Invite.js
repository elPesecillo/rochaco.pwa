import Layout from "../components/layout/Layout";
import * as authCommons from "../server/Utils/authCommons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TabContent from "../components/layout/TabContent";
import Friend from "../components/invite/Friend";
import Service from "../components/invite/Service";
import Visits from "../components/invite/Visits";

export async function getServerSideProps(ctx) {
  return await authCommons.isValidPage(ctx, serverSideTranslations);
}

const Invite = () => {
  return (
    <Layout>
      <TabContent
        childComponents={[
          { component: <Friend />, key: "RegisterFriend" },
          {
            component: <Service />,
            key: "RegisterService",
          },
          { component: <Visits />, key: "MyVisits" },
        ]}
      />
    </Layout>
  );
};

export default Invite;
