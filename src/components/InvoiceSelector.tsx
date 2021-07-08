import { useInvoices } from "../hooks";
import InvoiceCreator from "./InvoiceCreator";

type InvoiceSelectorProps = {
  selectedId: number,
  onChange: Function,
  onDelete: Function,
};
const InvoiceSelector = ({ selectedId, onChange, onDelete }: InvoiceSelectorProps) => {
  const [invoices] = useInvoices();

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
      <button
        onClick={() => {
          if (window.confirm("Supprimer la facture ?")) onDelete(selectedId);
        }}
        disabled={!selectedId}
      >
        ❌
      </button>
    </div>
  );
};

export default InvoiceSelector;
