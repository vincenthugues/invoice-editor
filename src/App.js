import { useState } from "react";
import "./App.css";
import InvoiceEditor from "./components/InvoiceEditor";
import InvoiceSelector from "./components/InvoiceSelector";
import { useInvoices } from "./hooks";

const App = () => {
  const [, , deleteInvoice] = useInvoices();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState();

  return (
    <div className="App">
      <header className="App-header no-print">
        <h1>Facturation</h1>
        <InvoiceSelector
          selectedId={selectedInvoiceId}
          onChange={(id) => setSelectedInvoiceId(id)}
          onDelete={(id) => deleteInvoice(id)}
        />
      </header>
      {selectedInvoiceId && <InvoiceEditor invoiceId={selectedInvoiceId} />}
    </div>
  );
};

export default App;
