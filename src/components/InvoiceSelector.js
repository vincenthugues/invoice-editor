import { useInvoices } from "../hooks";
import { InvoiceCreator } from "./InvoiceCreator";

const InvoiceSelector = ({ selectedId, onChange }) => {
  const [invoices] = useInvoices();

  console.log({ selectedId });

  return (
    <div className="InvoiceSelector">
      <select
        value={selectedId || ""}
        onChange={({ target: { value } }) =>
          onChange(value ? Number(value) : null)
        }
      >
        <option value="">--Sélectionner une facture--</option>
        {invoices.map(({ id, number, date, patientName }) => (
          <option key={id} value={id}>
            {number} {new Date(date).toLocaleDateString("fr-FR")} {patientName}
          </option>
        ))}
      </select>
      <InvoiceCreator onCreate={onChange} />
    </div>
  );
};

export default InvoiceSelector;
