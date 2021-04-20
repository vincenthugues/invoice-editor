import { useState } from "react";
import { useInvoices } from "../hooks";

export const InvoiceCreator = () => {
  const [invoices, createInvoice] = useInvoices();
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("20219999");

  if (!isCreatorOpen) {
    return <button onClick={() => setIsCreatorOpen(true)}>➕</button>;
  }

  return (
    <form>
      <input
        name="number"
        type="number"
        value={invoiceNumber}
        onChange={({ target: { value } }) => setInvoiceNumber(value)}
        onSubmit={(e) => e.preventDefault()}
      />
      <button
        onClick={() => {
          setIsCreatorOpen(false);
          createInvoice({
            number: invoiceNumber,
            clientName: null,
            patientName: null,
            rate: null,
          });
        }}
        type="submit"
        disabled={
          !invoiceNumber ||
          invoices.find(({ number }) => number === invoiceNumber)
        }
      >
        Valider
      </button>
    </form>
  );
};
