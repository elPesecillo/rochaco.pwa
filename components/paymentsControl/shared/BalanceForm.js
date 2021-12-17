import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import Carousel from "../../common/Carousel";
import { FaArrowLeft } from "react-icons/fa";

function BalanceForm({ period, onBackClick }) {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [initialStatus, setInitialStatus] = useState(null);
  const fileRef = useRef(null);
  const statusData = [
    { value: "not paid", label: "Sin Pago" },
    { value: "pending", label: "Revisión pendiente" },
    { value: "approved", label: "Pago acreditado" },
    { value: "rejected", label: "Pago rechazado" },
  ];

  useEffect(() => {
    console.log("el periodo", period);
    if (period?.status) {
      setInitialStatus(statusData.find((d) => period.status === d.value));
      setSelectedStatus(statusData.find((d) => period.status === d.value));
    }
  }, [period]);

  const handleOnStatusChange = (selected) => {
    setSelectedStatus(selected);
  };

  return (
    <>
      <button
        className="btn btn-accent btn-sm h-10 rounded-full"
        onClick={onBackClick}
      >
        <FaArrowLeft size={16} /> Regresar
      </button>
      <div className="md:grid md:grid-cols-2 text-left ">
        <div className="">
          <div className="form-control m-2">
            <label className="label">Periodo</label>
            <input
              className="input input-bordered"
              type="text"
              value={period?.name}
              disabled={true}
            />
          </div>
          <div className="form-control m-2">
            <label className="label">Cantidad</label>
            <input
              className="input input-bordered"
              value={period?.amount}
              type="text"
              disabled={true}
            />
          </div>
          <div className="form-control m-2">
            <label className="label">Ultima actualización</label>
            <input
              className="input input-bordered"
              value={
                period?.payment?.comments?.length > 0
                  ? period?.payment?.comments[
                      period?.payment?.comments.length - 1
                    ]?.comment
                  : "No hay comentarios"
              }
              disabled={true}
            />
          </div>
          {initialStatus?.value !== "not paid" && (
            <div className="form-control m-2">
              <label className="label">Estado del pago</label>
              <Select
                options={statusData}
                className="input-bordered"
                value={selectedStatus}
                placeholder="Selecciona un estado"
                onChange={handleOnStatusChange}
              />
            </div>
          )}
          <div className="w-full my-2 p-4">
            {initialStatus?.value !== selectedStatus?.value &&
              selectedStatus?.value !== "" && (
                <>
                  {selectedStatus?.value === "rejected" && (
                    <div className="form-control">
                      <label className="label">
                        Especifica la razón del rechazo del pago
                      </label>
                      <textarea
                        className="textarea textarea-bordered"
                        rows={3}
                      ></textarea>
                    </div>
                  )}
                  <button className="btn btn-primary w-full m-2">
                    Aplicar cambios
                  </button>
                </>
              )}
            {initialStatus?.value === "not paid" && (
              <div className="px-4">
                <button className="btn btn-primary w-full m-2">
                  Acreditar
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="text-left my-2">
          {period?.payment?.vouchers?.length > 0 && (
            <div className="form-control my-2">
              <Carousel
                images={period?.payment?.vouchers?.map((v) => ({
                  src: v.url,
                }))}
              />
            </div>
          )}
          {!period?.payment?.vouchers && (
            <>
              <h3 class="text-center">No hay comprobantes</h3>
              <div className="form-control my-2">
                <button className="btn btn-accent">
                  Seleccionar un comprobante
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BalanceForm;
