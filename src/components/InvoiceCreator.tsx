import { useState } from 'react';
import { Invoice } from '../types';
import {
  DEFAULT_INVOICE_RATE,
  getNewInvoiceDefaultNumber,
  getNewInvoiceDefaultRate,
} from '../utils';
import Modal from './Modal';
import ModalInput, { ModalInputType } from './ModalInput';

type InvoiceCreatorProps = {
  invoices: Invoice[];
  onCreate: Function;
};
const InvoiceCreator = ({ invoices, onCreate }: InvoiceCreatorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberInput, setNumberInput] = useState(1);
  const [clientInput, setClientInput] = useState('');
  const [patientInput, setPatientInput] = useState('');
  const [rateInput, setRateInput] = useState(DEFAULT_INVOICE_RATE / 100);

  const onSubmit = () => {
    onCreate({
      number: numberInput,
      clientName: clientInput,
      patientName: patientInput,
      rate: Number(rateInput) * 100,
    });
    setIsModalOpen(false);
  };

  const isFormValid =
    !!numberInput &&
    !invoices.find(({ number }) => number === numberInput) &&
    !!clientInput &&
    !!patientInput &&
    !!rateInput &&
    rateInput > 0;

  return (
    <>
      <button
        onClick={() => {
          setNumberInput(getNewInvoiceDefaultNumber(invoices));
          setRateInput(getNewInvoiceDefaultRate(invoices) / 100);
          setIsModalOpen(true);
        }}
        disabled={isModalOpen}
      >
        ➕ Nouvelle facture
      </button>
      {isModalOpen && (
        <Modal
          title="Nouvelle facture"
          onSubmit={onSubmit}
          onClose={() => setIsModalOpen(false)}
          isFormValid={isFormValid}
        >
          <ModalInput
            type={ModalInputType.NumberInput}
            label="Numéro"
            defaultValue={numberInput}
            onChange={setNumberInput}
          />
          <ModalInput
            label="Client"
            size={24}
            defaultValue={clientInput}
            onChange={setClientInput}
          />
          <ModalInput
            label="Patient"
            size={24}
            defaultValue={patientInput}
            onChange={setPatientInput}
          />
          <ModalInput
            type={ModalInputType.NumberInput}
            label="Taux"
            defaultValue={rateInput}
            onChange={setRateInput}
          />
        </Modal>
      )}
    </>
  );
};

export default InvoiceCreator;
