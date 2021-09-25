import { maxBy } from 'lodash';
import { useState } from 'react';
import { Invoice } from '../hooks';
import Modal, { ModalInput, ModalInputType } from './Modal';

const DEFAULT_INVOICE_NUMBER = 20210001;
const DEFAULT_INVOICE_RATE = 50;

type InvoiceCreatorProps = {
  invoices: Array<Invoice>,
  onCreate: Function,
};
const InvoiceCreator = ({ invoices, onCreate }: InvoiceCreatorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberInput, setNumberInput] = useState(DEFAULT_INVOICE_NUMBER);
  const [clientInput, setClientInput] = useState('');
  const [patientInput, setPatientInput] = useState('');
  const [rateInput, setRateInput] = useState(DEFAULT_INVOICE_RATE);

  const onSubmit = () => {
    onCreate({
      number: numberInput,
      clientName: clientInput,
      patientName: patientInput,
      rate: Number(rateInput),
    });
    setIsModalOpen(false);
  };

  const isFormValid = !!numberInput
    && !invoices.find(({ number }) => number === numberInput)
    && !!clientInput
    && !!patientInput
    && !!rateInput
    && rateInput > 0;

  return (
    <>
      <button onClick={() => {
        const maxInvoiceNumber = maxBy(invoices, 'number')?.number;
        const nextInvoiceNumber = maxInvoiceNumber ? maxInvoiceNumber + 1 : DEFAULT_INVOICE_NUMBER;
        setNumberInput(nextInvoiceNumber);
        setIsModalOpen(true);
      }} disabled={isModalOpen}>
        ➕ Nouvelle facture
      </button>
      {isModalOpen && (
        <Modal title="Nouvelle facture" onSubmit={onSubmit} onClose={() => setIsModalOpen(false)} isFormValid={isFormValid as boolean}>
          <ModalInput type={ModalInputType.NumberInput} label="Numéro" defaultValue={numberInput} onChange={setNumberInput} />
          <ModalInput label="Client" size={24} defaultValue={clientInput} onChange={setClientInput} />
          <ModalInput label="Patient" size={24} defaultValue={patientInput} onChange={setPatientInput} />
          <ModalInput type={ModalInputType.NumberInput} label="Taux" defaultValue={rateInput} onChange={setRateInput} />
        </Modal>
      )}
    </>
  );
};

export default InvoiceCreator;
