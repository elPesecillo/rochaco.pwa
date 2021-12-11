import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as paymentActions from "../../redux/actions/paymentActions";
import { useTranslation } from "next-i18next";
import { AgGridReact, AgGridColumn } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import agGridLocaleES from "../../constants/agGridLocaleES";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import useWindowSize from "../../hooks/useWindowSize";
import Loading from "../common/Loading";

function ManualPayment({
  user,
  paymentPeriods,
  totalAmount,
  paymentBalance,
  paymentBalanceBySuburb,
  paymentHistory,
  loadPaymentPeriods,
  uploadPaymentReceipt,
  loadPaymentHistory,
  loadPaymentsByAddress,
  setPaymentsByAddress,
  loadPaymentBalance,
}) {
  const { height } = useWindowSize();
  const [loading, setLoading] = useState(false);
  const [rowValues, setRowValues] = useState([]);
  useEffect(() => {
    let { suburb } = user;
    if (suburb?.id) {
      loadPaymentHistory(suburb?.id);
    }
  }, []);

  return (
    <div className="w-full" style={{ height: height * 0.75 || 1 }}>
      {loading && <Loading size="xl" margin="m-auto my-5" />}
      {!loading && (
        <AgGridReact
          modules={[
            ClientSideRowModelModule,
            RowGroupingModule,
            SetFilterModule,
          ]}
          localeText={agGridLocaleES}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            sortable: true,
            resizable: true,
            menuTabs: ["filterMenuTab"],
          }}
          className="ag-theme-alpine"
          autoGroupColumnDef={{ minWidth: 200 }}
          animateRows={true}
          //onGridReady={onGridReady}
          rowData={rowValues}
          rowGroupPanelShow={"always"}
        ></AgGridReact>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    paymentPeriods: state.payments.paymentPeriods,
    totalAmount: state.payments.totalAmount,
    paymentBalance: state.payments.paymentBalance,
    paymentBalanceBySuburb: state.payments.paymentBalanceBySuburb,
    paymentHistory: state.payments.paymentHistory,
  };
}

const mapDispatchToProps = {
  loadPaymentPeriods: paymentActions.loadPaymentPeriods,
  uploadPaymentReceipt: paymentActions.uploadPaymentReceipt,
  loadPaymentHistory: paymentActions.loadPaymentHistory,
  loadPaymentsByAddress: paymentActions.loadPaymentsByAddress,
  setPaymentsByAddress: paymentActions.loadPaymentsByAddressSuccess,
  loadPaymentBalance: paymentActions.loadPaymentBalance,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManualPayment);
