import { maxBy } from 'lodash';
import { useState } from 'react';
import { ServiceProvision } from '../types';
import Modal from './Modal';
import ModalInput, { ModalInputType } from './ModalInput';

type ServiceProvisionCreatorProps = {
  serviceProvisions: ServiceProvision[];
  onCreate: Function;
};
const ServiceProvisionCreator = ({
  serviceProvisions,
  onCreate,
}: ServiceProvisionCreatorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [headingInput, setHeadingInput] = useState('');
  const [detailsInput, setDetailsInput] = useState('');
  const [hoursInput, setHoursInput] = useState(1);

  const maxServiceProvisionId = maxBy(serviceProvisions, 'id')?.id || 0;
  const onSubmit = () => {
    onCreate({
      id: maxServiceProvisionId + 1,
      heading: headingInput,
      details: detailsInput,
      hours: hoursInput,
    });
    setIsModalOpen(false);
    setHeadingInput('');
    setDetailsInput('');
    setHoursInput(1);
  };
  const isFormValid = !!headingInput && !!detailsInput && hoursInput > 0;

  return (
    <>
      <button
        className="no-print"
        onClick={() => setIsModalOpen(true)}
        disabled={isModalOpen}
      >
        Nouvelle ligne
      </button>
      {isModalOpen && (
        <Modal
          title="Nouveau service"
          onSubmit={onSubmit}
          onClose={() => setIsModalOpen(false)}
          isFormValid={isFormValid}
        >
          <ModalInput
            label="Titre"
            size={44}
            defaultValue={headingInput}
            onChange={setHeadingInput}
          />
          <ModalInput
            type={ModalInputType.TextArea}
            label="Détails"
            rows={5}
            cols={40}
            defaultValue={detailsInput}
            onChange={setDetailsInput}
          />
          <ModalInput
            type={ModalInputType.NumberInput}
            min={0.25}
            step={0.25}
            label="Heures"
            defaultValue={hoursInput}
            onChange={setHoursInput}
          />
        </Modal>
      )}
    </>
  );
};

export default ServiceProvisionCreator;
