import InvoiceSelector from './InvoiceSelector';
import InvoiceCreator from './InvoiceCreator';
import InvoiceDuplicator from './InvoiceDuplicator';
import PersonalInfoEditor from './PersonalInfoEditor';
import { Invoice, useInvoices } from '../hooks';

type NavBarProps = {
  currentInvoiceId?: number,
  setCurrentInvoiceId: Function,
};
const NavBar = ({ currentInvoiceId, setCurrentInvoiceId }: NavBarProps) => {
  const [invoices, createInvoice, deleteInvoice] = useInvoices();

  const onInvoiceChange = (id?: number) => { setCurrentInvoiceId(id); };
  const onInvoiceCreate = (newInvoice: Invoice) => { const id = createInvoice(newInvoice); setCurrentInvoiceId(id); };
  const onInvoiceDelete = (id: number) => { deleteInvoice(id); setCurrentInvoiceId(undefined); };

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
              <InvoiceCreator invoices={invoices} onCreate={onInvoiceCreate} />
            </li>
            <li>
              <InvoiceDuplicator currentInvoiceId={currentInvoiceId} invoices={invoices} onCreate={onInvoiceCreate} />
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

export default NavBar;
