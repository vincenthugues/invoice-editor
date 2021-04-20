import { useState } from "react";
import "./App.css";
import { InvoiceCreator } from "./components/InvoiceCreator";
import InvoiceEditor from "./components/InvoiceEditor";
import InvoiceSelector from "./components/InvoiceSelector";

const App = () => {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState();

  return (
    <div className="App">
      <header className="App-header no-print">
        <h1>Facturation</h1>
        <InvoiceSelector
          selectedId={selectedInvoiceId}
          onChange={(id) => setSelectedInvoiceId(id)}
        />
        <InvoiceCreator />
      </header>
      {selectedInvoiceId && <InvoiceEditor invoiceId={selectedInvoiceId} />}
    </div>
  );
};

export default App;
