import './App.css';
import Invoice from './components/Invoice';

const App = () => (
  <div className="App">
    <header className="App-header no-print">
      <h1>Facture</h1>
    </header>
    <Invoice />
  </div>
);

export default App;
