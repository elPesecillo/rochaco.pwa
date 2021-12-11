import { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as visitReportActions from "../../redux/actions/visitReportActions";
import moment from "moment";
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
import { FaSearch } from "react-icons/fa";

function Visits({ user, loadSuburbVisits }) {
  const { t } = useTranslation();
  const { height } = useWindowSize();
  const [loading, setLoading] = useState(false);
  const [initialDate, setInitialDate] = useState(moment().format("YYYY-MM-DD"));
  const [finalDate, setFinalDate] = useState(
    moment().add(1, "day").format("YYYY-MM-DD")
  );
  const [rowValues, setRowValues] = useState([]);
  useEffect(() => {
    handleLoadVisits();
  }, []);

  const handleLoadVisits = async () => {
    try {
      let { suburb } = user;
      setLoading(true);
      const timezoneOffset = new Date().getTimezoneOffset() * 60000;
      let loadedVisits = await loadSuburbVisits(
        suburb.id, //"604166054d37af669023685d", //
        initialDate,
        finalDate,
        timezoneOffset
      );

      setRowValues(
        loadedVisits.map((v) => ({
          ...v,
          day: moment(v.timeIn).format("YYYY-MM-DD"),
          hour: moment(v.timeIn).format("HH:mm"),
          timeIn: moment(v.timeIn)
            .utcOffset(-timezoneOffset)
            .format("YYYY-MM-DDTHH:mm:ss"),
        }))
      );

      setLoading(false);
      return loadedVisits.map((v) => ({
        ...v,
        day: moment(v.timeIn).utcOffset(-timezoneOffset).format("YYYY-MM-DD"),
        hour: moment(v.timeIn).utcOffset(-timezoneOffset).format("hh:mm a"),
        timeIn: moment(v.timeIn)
          .utcOffset(-timezoneOffset)
          .format("YYYY-MM-DDTHH:mm:ss"),
      }));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const filterParams = {
    buttons: ["reset", "apply"],
    closeOnApply: true,
    // provide comparator function
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      const dateAsString = cellValue;

      if (dateAsString == null) {
        return 0;
      }

      // In the example application, dates are stored as dd/mm/yyyy
      // We create a Date object for comparison against the filter date
      const dateParts = dateAsString.split("-");
      const year = Number(dateParts[0]);
      const month = Number(dateParts[1]) - 1;
      const day = Number(dateParts[2]);
      const cellDate = new Date(year, month, day);
      // Now that both parameters are Date objects, we can compare
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      } else if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    },
  };

  return (
    <>
      <div className="w-full p-4">
        <div className="md:grid md:grid-cols-5">
          <div className="form-control my-3 md:col-span-2 md:grid md:grid-cols-3">
            <label className="label hidden md:block md:text-right md:pr-4">
              {t("input_start_date")}
            </label>
            <input
              type="date"
              placeholder={t("input_start_date")}
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              className="input input-bordered  md:col-span-2"
            />
          </div>
          <div className="form-control my-3 md:col-span-2 md:grid md:grid-cols-3">
            <label className="label hidden md:block md:text-right md:pr-4">
              {t("input_end_date")}
            </label>
            <input
              type="date"
              placeholder={t("input_end_date")}
              value={finalDate}
              onChange={(e) => setFinalDate(e.target.value)}
              className="input input-bordered  md:col-span-2"
            />
          </div>
          <div className="form-control m-3">
            <button
              className="btn btn-primary"
              onClick={handleLoadVisits}
              disabled={loading}
            >
              {loading && <Loading size="sm" />}
              {!loading && <FaSearch className="mx-2" />}
              {t("button_search")}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full" style={{ height: height * 0.65 || 1 }}>
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
          >
            <AgGridColumn
              field="hostAddress"
              headerName="Dirección"
              enableRowGroup={true}
              filter="agSetColumnFilter"
            />
            <AgGridColumn
              field="visitorName"
              headerName="Visitante"
              enableRowGroup={true}
              filter="agSetColumnFilter"
            />
            <AgGridColumn
              field="visitorVehicle"
              headerName="Vehiculo"
              filter="agSetColumnFilter"
            />
            <AgGridColumn
              field="visitorPlates"
              headerName="Placas"
              filter="agSetColumnFilter"
            />
            <AgGridColumn
              field="visitorReason"
              headerName="Motivo"
              filter="agSetColumnFilter"
            />
            <AgGridColumn
              field="day"
              headerName="Fecha"
              filter="agDateColumnFilter"
              filterParams={filterParams}
            />
            <AgGridColumn field="hour" headerName="Hora" />
          </AgGridReact>
        )}
      </div>
      {/* <pre>{JSON.stringify(rowValues, null, "  ") || "no data"}</pre> */}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
  };
}

const mapDispatchToProps = {
  loadSuburbVisits: visitReportActions.loadSuburbVisits,
};

export default connect(mapStateToProps, mapDispatchToProps)(Visits);
