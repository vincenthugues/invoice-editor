import { useState } from "react";
import { useInvoices } from "../hooks";

const DEFAULT_INVOICE_NUMBER = 20210000;
const DEFAULT_INVOICE_RATE = 50;

type InvoiceCreatorProps = {
  onCreate: Function,
};
const InvoiceCreator = ({ onCreate }: InvoiceCreatorProps) => {
  const [invoices, createInvoice] = useInvoices();
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(DEFAULT_INVOICE_NUMBER);
  const [invoiceClient, setInvoiceClient] = useState('');
  const [invoicePatient, setInvoicePatient] = useState('');
  const [invoiceRate, setInvoiceRate] = useState(DEFAULT_INVOICE_RATE);

  const isFormValid = invoiceNumber
    && !invoices.find(({ number }) => number === invoiceNumber)
    && invoiceClient
    && invoicePatient
    && invoiceRate
    && invoiceRate > 0;

  if (!isCreatorOpen) {
    return <button onClick={() => setIsCreatorOpen(true)}>➕</button>;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="number">Number</label>
        <input
          id="number"
          name="number"
          type="number"
          value={invoiceNumber}
          onChange={({ target: { value } }) => setInvoiceNumber(Number(value))}
        />
      </div>
      <div>
        <label htmlFor="client">Client</label>
        <input
          id="client"
          name="client"
          type="text"
          value={invoiceClient}
          onChange={({ target: { value } }) => setInvoiceClient(value)}
        />
      </div>
      <div>
        <label htmlFor="patient">Patient</label>
        <input
          id="patient"
          name="patient"
          type="text"
          value={invoicePatient}
          onChange={({ target: { value } }) => setInvoicePatient(value)}
        />
      </div>
      <div>
        <label htmlFor="rate">Taux</label>
        <input
          id="rate"
          name="rate"
          type="number"
          value={invoiceRate}
          onChange={({ target: { value } }) => setInvoiceRate(Number(value))}
        />
      </div>
      <div>
        <button
          onClick={() => {
            const newInvoiceId = createInvoice({
              number: invoiceNumber,
              clientName: invoiceClient,
              patientName: invoicePatient,
              rate: Number(invoiceRate),
            });
            onCreate(newInvoiceId);
            setIsCreatorOpen(false);
          }}
          type="submit"
          disabled={!isFormValid}
        >
          Valider
        </button>
        <button onClick={() => setIsCreatorOpen(false)}>Annuler</button>
      </div>
    </form>
  );
};

export default InvoiceCreator;
