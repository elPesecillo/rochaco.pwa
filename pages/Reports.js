import Layout from "../components/layout/Layout";
import * as authCommons from "../server/Utils/authCommons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TabContent from "../components/layout/TabContent";
import Visits from "../components/reports/Visits";

export async function getServerSideProps(ctx) {
  return await authCommons.isValidPage(ctx, serverSideTranslations);
}

const Report = () => {
  return (
    <Layout>
      <TabContent
        childComponents={[{ component: <Visits />, key: "Report" }]}
      />
    </Layout>
  );
};

export default Report;
