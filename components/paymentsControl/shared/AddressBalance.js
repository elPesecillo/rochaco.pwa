import { useState, useEffect } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import { AgGridReact, AgGridColumn } from "@ag-grid-community/react";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import agGridLocaleES from "../../../constants/agGridLocaleES";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { useTranslation } from "next-i18next";
import BalanceForm from "./BalanceForm";

function AddressBalance({ addressBalanceData }) {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    if (addressBalanceData.length > 0) {
      setRowData(
        addressBalanceData.map((d) => ({
          ...d,
          period: d.name,
          amount: `${d.amount.$numberDecimal}`,
          mandatory: d.isMandatory ? "Si" : "No",
          status: d.payStatus,
        }))
      );
      setSelectedPeriod(null);
    }
  }, [addressBalanceData]);

  const handleSelectPeriod = (period) => {
    console.log(period);
    setSelectedPeriod(period);
  };

  const renderStatus = (params) => {
    const cellValue = params.valueFormatted
      ? params.valueFormatted
      : params.value;
    const data = params.data || {};
    return (
      <span className="inline-grid text-center lg:grid lg:grid-cols-2 w-full">
        <span className="">{cellValue}</span>
        <button
          className="btn btn-primary btn-xs m-auto"
          onClick={() => handleSelectPeriod(data)}
        >
          Revisar
        </button>
      </span>
    );
  };

  const [rowData, setRowData] = useState([]);
  const { height } = useWindowSize();

  const handleBackClick = () => {
    setSelectedPeriod(null);
  };

  return (
    <div className="w-full" style={{ height: height * 0.75 }}>
      {!selectedPeriod && (
        <AgGridReact
          modules={[ClientSideRowModelModule, SetFilterModule]}
          localeText={agGridLocaleES}
          defaultColDef={{
            flex: 1,
            minWidth: 30,
            sortable: true,
            resizable: true,
            autoHeight: true,
            menuTabs: ["filterMenuTab"],
          }}
          className="ag-theme-alpine"
          autoGroupColumnDef={{ minWidth: 200 }}
          animateRows={true}
          rowData={rowData}
        >
          <AgGridColumn field="period" headerName="Periodo" />
          <AgGridColumn field="amount" headerName="Cantidad" />
          <AgGridColumn field="mandatory" headerName="Obligatorio" />
          <AgGridColumn
            field="status"
            headerName="Estado"
            cellRendererFramework={renderStatus}
          />
        </AgGridReact>
      )}
      {selectedPeriod && (
        <BalanceForm period={selectedPeriod} onBackClick={handleBackClick} />
      )}
    </div>
  );
}

export default AddressBalance;
