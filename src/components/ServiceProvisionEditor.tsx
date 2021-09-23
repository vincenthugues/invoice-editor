import { useState } from 'react';
import { ServiceProvision } from '../hooks';
import Modal, { ModalInput, ModalInputType } from './Modal';

type ServiceProvisionEditorProps = {
  serviceProvision: ServiceProvision,
  onSave: Function,
};
const ServiceProvisionEditor = ({ serviceProvision, onSave }: ServiceProvisionEditorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headingInput, setHeadingInput] = useState(serviceProvision.heading);
  const [detailsInput, setDetailsInput] = useState(serviceProvision.details);
  const [hoursInput, setHoursInput] = useState(serviceProvision.hours);

  const onSubmit = () => {
    onSave({
      heading: headingInput,
      details: detailsInput,
      hours: hoursInput,
    });
    setIsModalOpen(false);
  };
  const isFormValid = !!headingInput
    && !!detailsInput
    && hoursInput > 0;

  return (
    <>
      <button
        className="no-print"
        onClick={() => setIsModalOpen(true)}
        disabled={isModalOpen}
      >
        ✏️
      </button>
      {isModalOpen && (
        <Modal title="Service" onSubmit={onSubmit} onClose={() => setIsModalOpen(false)} isFormValid={isFormValid}>
          <ModalInput label="Titre" size={44} defaultValue={headingInput} onChange={setHeadingInput} />
          <ModalInput type={ModalInputType.TextArea} label="Détails" rows={5} cols={40} defaultValue={detailsInput} onChange={setDetailsInput} />
          <ModalInput type={ModalInputType.NumberInput} min={.25} step={.25} label="Heures" defaultValue={hoursInput} onChange={setHoursInput} />
        </Modal>
      )}
    </>
  );
};

export default ServiceProvisionEditor;
