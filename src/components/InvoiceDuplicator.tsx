import { useState } from 'react';
import { Invoice } from '../hooks';
import { DEFAULT_INVOICE_RATE, getNewInvoiceDefaultNumber } from '../utils';
import Modal from './Modal';
import ModalInput, { ModalInputType } from './ModalInput';

type InvoiceDuplicatorProps = {
  currentInvoiceId?: number;
  invoices: Array<Invoice>;
  onCreate: Function;
};
const InvoiceDuplicator = ({
  currentInvoiceId,
  invoices,
  onCreate,
}: InvoiceDuplicatorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentInvoice = invoices.find(({ id }) => id === currentInvoiceId);
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
      serviceProvisions: currentInvoice?.serviceProvisions,
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
          setClientInput(currentInvoice?.clientName || '');
          setPatientInput(currentInvoice?.patientName || '');
          setRateInput((currentInvoice?.rate || DEFAULT_INVOICE_RATE) / 100);
          setIsModalOpen(true);
        }}
        disabled={isModalOpen || !currentInvoiceId}
        style={{ color: currentInvoiceId ? '#fff' : '#aaa' }}
      >
        🧬 Dupliquer la facture
      </button>
      {isModalOpen && (
        <Modal
          title="Nouvelle facture"
          onSubmit={onSubmit}
          onClose={() => setIsModalOpen(false)}
          isFormValid={isFormValid as boolean}
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

export default InvoiceDuplicator;
