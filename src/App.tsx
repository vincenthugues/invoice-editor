import { useState } from 'react';
import './App.css';
import PersonalInfoEditor from './components/PersonalInfoEditor';
import InvoiceSelector from './components/InvoiceSelector';
import InvoiceEditor from './components/InvoiceEditor';
import { useInvoices } from './hooks';

const App = () => {
  const [, , deleteInvoice] = useInvoices();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState();

  return (
    <div className="App">
      <header className="App-header no-print">
        <h1>Facturation</h1>
        <PersonalInfoEditor />
        <InvoiceSelector
          selectedId={selectedInvoiceId}
          onChange={(id: any) => { setSelectedInvoiceId(id); }}
          onDelete={(id: number) => { deleteInvoice(id); setSelectedInvoiceId(undefined); }}
        />
      </header>
      {selectedInvoiceId && <InvoiceEditor invoiceId={(selectedInvoiceId as unknown as number)} />}
    </div>
  );
};

export default App;
