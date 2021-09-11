import { PropsWithChildren, useEffect, useState } from 'react';
import { usePersonalInfo } from '../hooks';

enum InputType {
  Input,
  TextArea,
}

type ModalInputProps = {
  type?: InputType,
  label: string,
  defaultValue: string,
  onChange: Function,
  size?: number,
  rows?: number,
  cols?: number,
};
const ModalInput = ({ type, label, defaultValue, onChange, size, rows, cols }: ModalInputProps) => (
  <label>
    {label}
    {' '}
    {type === InputType.TextArea ? (
      <textarea
        defaultValue={defaultValue}
        onChange={({ target: { value }}) => { onChange(value); }}
        rows={rows}
        cols={cols}
      />
    ) : (
      <input
        defaultValue={defaultValue}
        onChange={({ target: { value }}) => { onChange(value); }}
        size={size}
      />
    )}
    </label>
);

type ModalProps = {
  title: string,
  onSubmit: Function,
  onClose: Function,
};
const Modal = ({ title, onSubmit, onClose, children }: PropsWithChildren<ModalProps>) => (
  <>
    <h6>{title}</h6>
    <form onSubmit={(e) => { onSubmit(); e.preventDefault(); }}>
      {children}
      <div>
        <button type="submit">✔️ Enregistrer</button>
        <button onClick={() => { onClose(); }}>❌ Annuler</button>
      </div>
    </form>
  </>
);

const PersonalInfoEditor = () => {
  const [personalInfo, updatePersonalInfo] = usePersonalInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [personalDetailsInput, setPersonalDetailsInput] = useState('');
  const [contactInfoInput, setContactInfoInput] = useState('');
  const [siretInput, setSiretInput] = useState('');

  useEffect(() => {
    const { name, personalDetails, contactInfo, siret } = personalInfo || {};

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

  if (!isModalOpen) {
    return (
      <button onClick={() => setIsModalOpen(true)}>
        ✏️ Informations personnelles
      </button>
    );
  }

  return (
    <Modal title="Informations personnelles" onSubmit={onSubmit} onClose={() => setIsModalOpen(false)}>
      <ModalInput label="Nom" size={44} defaultValue={nameInput} onChange={setNameInput} />
      <ModalInput type={InputType.TextArea} label="Détails" rows={5} cols={40} defaultValue={personalDetailsInput} onChange={setPersonalDetailsInput} />
      <ModalInput type={InputType.TextArea} label="Contact" rows={3} cols={40} defaultValue={contactInfoInput} onChange={setContactInfoInput} />
      <ModalInput label="Siret" size={44} defaultValue={siretInput} onChange={setSiretInput} />
    </Modal>
  );
};

export default PersonalInfoEditor;
