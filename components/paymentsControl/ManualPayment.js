import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as paymentActions from "../../redux/actions/paymentActions";
import { useTranslation } from "next-i18next";
import { AgGridReact, AgGridColumn } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import agGridLocaleES from "../../constants/agGridLocaleES";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import useWindowSize from "../../hooks/useWindowSize";
import Loading from "../common/Loading";
import { FaTimes } from "react-icons/fa";
import AddressBalance from "./shared/AddressBalance";

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
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressData, setSelectedAddressData] = useState([]);

  useEffect(() => {
    loadPaymentData();
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      loadAddressData();
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (paymentBalanceBySuburb.length > 0) {
      setSelectedAddressData(paymentBalanceBySuburb);
    }
  }, [paymentBalanceBySuburb]);

  const loadAddressData = async () => {
    try {
      let { suburb } = user;
      await loadPaymentsByAddress(suburb.id, selectedAddress?.addressId, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  const loadPaymentData = async () => {
    try {
      let { suburb } = user;
      if (suburb?.id) {
        setLoading(true);
        await loadPaymentHistory(suburb?.id);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    if (paymentHistory.length > 0) {
      setRowValues(
        paymentHistory.map((p) => ({
          addressId: p?.address?._id,
          address: `${p?.address?.name} ${p?.address?.number}`,
          balance: p.balance,
          status:
            p?.paidPeriodStatus.pending > 0
              ? "Por Confirmar"
              : p?.paidPeriodStatus.rejected > 0
              ? "Rechazado"
              : p?.balance < 0
              ? "Pendiente"
              : "Acreditado",
        }))
      );
    }
  }, [paymentHistory]);

  const handleSelectAddress = (address) => {
    setShowAddressModal(true);
    setSelectedAddress(address);
    console.log(address);
  };

  const handleCloseModal = () => {
    setShowAddressModal(false);
    setSelectedAddress(null);
  };

  const renderStatus = (params) => {
    const cellValue = params.valueFormatted
      ? params.valueFormatted
      : params.value;
    const data = params.data || {};

    const getStatusClass = (status) => {
      switch (status.toLowerCase()) {
        case "pendiente":
          return "text-yellow-500 text-xs p-2";
        case "por confirmar":
          return "text-blue-500 text-xs p-2";
        case "rechazado":
          return "text-red-500 text-xs p-2";
        case "acreditado":
          return "text-green-500 text-xs p-2";
        default:
          return "text-gray-500 text-xs p-2";
      }
    };

    return (
      <span className="inline-grid text-center md:grid md:grid-cols-2 w-full p-1">
        <span className={getStatusClass(cellValue)}>{cellValue}</span>
        <button
          className="btn btn-primary btn-xs m-auto"
          onClick={() => handleSelectAddress(data)}
        >
          Editar
        </button>
      </span>
    );
  };

  return (
    <>
      <div className="w-full" style={{ height: height * 0.85 || 1 }}>
        {loading && <Loading size="xl" margin="m-auto my-5" />}
        {!loading && (
          <AgGridReact
            modules={[
              ClientSideRowModelModule,
              //RowGroupingModule,
              SetFilterModule,
            ]}
            localeText={agGridLocaleES}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
              sortable: true,
              resizable: true,
              //wrapText: true,
              autoHeight: true,
              menuTabs: ["filterMenuTab"],
            }}
            className="ag-theme-alpine"
            autoGroupColumnDef={{ minWidth: 200 }}
            animateRows={true}
            //onGridReady={onGridReady}
            rowData={rowValues}
            //rowGroupPanelShow={"always"}
          >
            <AgGridColumn field="address" />
            <AgGridColumn field="balance" />
            <AgGridColumn field="status" cellRendererFramework={renderStatus} />
          </AgGridReact>
        )}
      </div>
      <div
        id="addressModal"
        className={showAddressModal ? "modal modal-open" : "modal"}
      >
        <div className="modal-box max-w-full md:w-10/12">
          <div className="w-full text-right">
            <button
              className="btn btn-secondary btn-sm h-10 rounded-full"
              onClick={handleCloseModal}
            >
              <FaTimes size={16} />
            </button>
          </div>
          <div className="w-full pt-2 overflow-y-scroll">
            <AddressBalance addressBalanceData={selectedAddressData} />
          </div>
        </div>
      </div>
    </>
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
