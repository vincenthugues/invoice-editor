import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import InvoiceEditor from './components/InvoiceEditor';

const App = () => {
  const [currentInvoiceId, setCurrentInvoiceId] = useState();

  return (
    <div className="App">
      <NavBar currentInvoiceId={currentInvoiceId} setCurrentInvoiceId={setCurrentInvoiceId} />
      {currentInvoiceId && <InvoiceEditor invoiceId={currentInvoiceId} />}
    </div>
  );
};

export default App;
