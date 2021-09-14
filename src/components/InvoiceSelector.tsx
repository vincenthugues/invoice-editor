import { useState } from 'react';
import { Invoice } from '../hooks';
import InvoiceCreator from './InvoiceCreator';

type InvoiceSelectorProps = {
  invoices: Array<Invoice>,
  selectedId: number | undefined,
  onChange: Function,
  onCreate: Function,
  onDelete: Function,
};
const InvoiceSelector = ({ invoices, selectedId, onChange, onCreate, onDelete }: InvoiceSelectorProps) => {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  return (
    <div className="InvoiceSelector">
      <select
        value={selectedId || ''}
        onChange={({ target: { value } }) => {
          onChange(value ? Number(value) : null);
          setIsCreatorOpen(false);
        }}
        disabled={isCreatorOpen}
      >
        <option value="">--Sélectionner une facture--</option>
        {invoices.map(({ id, number, date, patientName }) => (
          <option key={id} value={id}>
            {number} {new Date(date).toLocaleDateString('fr-FR')} {patientName}
          </option>
        ))}
      </select>
      <InvoiceCreator
        isOpen={isCreatorOpen}
        onOpen={() => { onChange(null); setIsCreatorOpen(true); }}
        onClose={() => { setIsCreatorOpen(false); }}
        onCreate={onCreate}
      />
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
};

export default InvoiceSelector;
