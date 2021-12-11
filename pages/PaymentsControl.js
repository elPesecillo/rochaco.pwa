import Layout from "../components/layout/Layout";
import * as authCommons from "../server/Utils/authCommons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TabContent from "../components/layout/TabContent";
import ManualPayment from "../components/paymentsControl/ManualPayment";

export async function getServerSideProps(ctx) {
  return await authCommons.isValidPage(ctx, serverSideTranslations);
}

function PaymentsControl() {
  return (
    <Layout>
      <TabContent
        childComponents={[
          { component: <ManualPayment />, key: "PaymentsControl" },
        ]}
      />
    </Layout>
  );
}

export default PaymentsControl;
