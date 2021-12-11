import Layout from "../components/layout/Layout";
import * as authCommons from "../server/Utils/authCommons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TabContent from "../components/layout/TabContent";
import Admin from "../components/admin/Admin";
import AddUser from "../components/admin/AddUser";

export async function getServerSideProps(ctx) {
  return await authCommons.isValidPage(ctx, serverSideTranslations);
}

const AdminLayout = () => {
  return (
    <Layout>
      <TabContent
        childComponents={[
          { component: <Admin />, key: "Manage" },
          { component: <AddUser />, key: "Admin" },
        ]}
      />
    </Layout>
  );
};

export default AdminLayout;
