import { useEffect, useState } from 'react';
import Modal from './Modal';
import ModalInput, { ModalInputType } from './ModalInput';
import { usePersonalInfo } from '../hooks';

const PersonalInfoEditor = () => {
  const [personalInfo, updatePersonalInfo] = usePersonalInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [personalDetailsInput, setPersonalDetailsInput] = useState('');
  const [contactInfoInput, setContactInfoInput] = useState('');
  const [siretInput, setSiretInput] = useState('');

  useEffect(() => {
    if (!personalInfo) return;
    const { name, personalDetails, contactInfo, siret } = personalInfo;

    setNameInput(name || '');
    setPersonalDetailsInput(personalDetails || '');
    setContactInfoInput(contactInfo || '');
    setSiretInput(siret || '');
  }, [personalInfo]);

  const onSubmit = () => {
    updatePersonalInfo({
      name: nameInput,
      personalDetails: personalDetailsInput,
      contactInfo: contactInfoInput,
      siret: siretInput,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} disabled={isModalOpen}>
        ✏️ Informations personnelles
      </button>
      {isModalOpen && (
        <Modal
          title="Informations personnelles"
          onSubmit={onSubmit}
          onClose={() => setIsModalOpen(false)}
        >
          <ModalInput
            label="Nom"
            size={44}
            defaultValue={nameInput}
            onChange={setNameInput}
          />
          <ModalInput
            type={ModalInputType.TextArea}
            label="Détails"
            rows={5}
            cols={40}
            defaultValue={personalDetailsInput}
            onChange={setPersonalDetailsInput}
          />
          <ModalInput
            type={ModalInputType.TextArea}
            label="Contact"
            rows={3}
            cols={40}
            defaultValue={contactInfoInput}
            onChange={setContactInfoInput}
          />
          <ModalInput
            label="Siret"
            size={44}
            defaultValue={siretInput}
            onChange={setSiretInput}
          />
        </Modal>
      )}
    </>
  );
};

export default PersonalInfoEditor;
