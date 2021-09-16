import { useState } from 'react';
import './App.css';
import PersonalInfoEditor from './components/PersonalInfoEditor';
import InvoiceSelector from './components/InvoiceSelector';
import InvoiceCreator from './components/InvoiceCreator';
import InvoiceEditor from './components/InvoiceEditor';
import { Invoice, useInvoices } from './hooks';

const App = () => {
  const [invoices, createInvoice, deleteInvoice] = useInvoices();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | undefined>();

  const onInvoiceChange = (id: number | undefined) => { setSelectedInvoiceId(id); };
  const onInvoiceCreate = (invoiceDraft: Invoice) => { const id = createInvoice(invoiceDraft); setSelectedInvoiceId(id); };
  const onInvoiceDelete = (id: number) => { deleteInvoice(id); setSelectedInvoiceId(undefined); };

  return (
    <div className="App">
      <header className="App-header no-print">
        <h1>Facturation</h1>
        <PersonalInfoEditor />
        <InvoiceSelector
          invoices={invoices}
          selectedId={selectedInvoiceId}
          onChange={onInvoiceChange}
          onDelete={onInvoiceDelete}
        />
        <InvoiceCreator onCreate={onInvoiceCreate} />
      </header>
      {selectedInvoiceId && <InvoiceEditor invoiceId={selectedInvoiceId} />}
    </div>
  );
};

export default App;
