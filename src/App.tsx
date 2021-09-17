import { useState } from 'react';
import './App.css';
import InvoiceSelector from './components/InvoiceSelector';
import InvoiceCreator from './components/InvoiceCreator';
import PersonalInfoEditor from './components/PersonalInfoEditor';
import InvoiceEditor from './components/InvoiceEditor';
import { Invoice, useInvoices } from './hooks';

type NavBarProps = {
  currentInvoiceId: number | null,
  setCurrentInvoiceId: Function,
};
const NavBar = ({ currentInvoiceId, setCurrentInvoiceId }: NavBarProps) => {
  const [invoices, createInvoice, deleteInvoice] = useInvoices();

  const onInvoiceChange = (id: number | null) => { setCurrentInvoiceId(id); };
  const onInvoiceCreate = (newInvoice: Invoice) => { const id = createInvoice(newInvoice); setCurrentInvoiceId(id); };
  const onInvoiceDelete = (id: number) => { deleteInvoice(id); setCurrentInvoiceId(null); };

  return (
    <header className="no-print">
      <div className="HeaderContent">
        <h1>Facturation</h1>
        <nav>
          <ul>
            <li>
              <InvoiceSelector
                invoices={invoices}
                selectedId={currentInvoiceId}
                onChange={onInvoiceChange}
              />
            </li>
            <li>
              <InvoiceCreator onCreate={onInvoiceCreate} />
            </li>
            <li>
              <button
                onClick={() => {
                  if (currentInvoiceId && window.confirm('Supprimer définitivement la facture ?')) {
                    onInvoiceDelete(currentInvoiceId);
                  }
                }}
                disabled={!currentInvoiceId}
                style={{ color: currentInvoiceId ? '#fff' : '#aaa' }}
              >
                ❌ Supprimer la facture
              </button>
            </li>
            <li>
              <PersonalInfoEditor />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const App = () => {
  const [currentInvoiceId, setCurrentInvoiceId] = useState<number | null>(null);

  return (
    <div className="App">
      <NavBar currentInvoiceId={currentInvoiceId} setCurrentInvoiceId={setCurrentInvoiceId} />
      {currentInvoiceId && <InvoiceEditor invoiceId={currentInvoiceId} />}
    </div>
  );
};

export default App;
