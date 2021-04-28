import { useState } from "react";
import { useInvoices } from "../hooks";

export const InvoiceCreator = ({ onCreate }) => {
  const [invoices, createInvoice] = useInvoices();
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(20219999);
  const [invoiceClient, setInvoiceClient] = useState('');
  const [invoicePatient, setInvoicePatient] = useState('');
  const [invoiceRate, setInvoiceRate] = useState(0);

  const isFormValid = 
    invoiceNumber && !invoices.find(({ number }) => number === invoiceNumber)
    && invoiceClient && invoicePatient && invoiceRate && invoiceRate > 0;

  if (!isCreatorOpen) {
    return <button onClick={() => setIsCreatorOpen(true)}>➕</button>;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor='number'>Number</label>
        <input
          id='number'
          name="number"
          type="number"
          value={invoiceNumber}
          onChange={({ target: { value } }) => setInvoiceNumber(value)}
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
        <label htmlFor="rate">Rate</label>
        <input
          id="rate"
          name="rate"
          type="number"
          value={invoiceRate}
          onChange={({ target: { value } }) => setInvoiceRate(value)}
        />
      </div>
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
    </form>
  );
};
