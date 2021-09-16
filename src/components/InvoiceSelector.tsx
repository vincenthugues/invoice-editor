import { Invoice } from '../hooks';

type InvoiceSelectorProps = {
  invoices: Array<Invoice>,
  selectedId: number | undefined,
  onChange: Function,
  onDelete: Function,
};
const InvoiceSelector = ({ invoices, selectedId, onChange, onDelete }: InvoiceSelectorProps) => (
  <div className="InvoiceSelector">
    <select
      value={selectedId || ''}
      onChange={({ target: { value } }) => {
        onChange(value ? Number(value) : null);
      }}
    >
      <option value="">--Sélectionner une facture--</option>
      {invoices.map(({ id, number, date, patientName }) => (
        <option key={id} value={id}>
          {number} {new Date(date).toLocaleDateString('fr-FR')} {patientName}
        </option>
      ))}
    </select>
    <button
      onClick={() => {
        if (window.confirm('Supprimer la facture ?')) onDelete(selectedId);
      }}
      disabled={!selectedId}
    >
      ❌
    </button>
  </div>
);

export default InvoiceSelector;
