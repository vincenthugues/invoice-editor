import { PropsWithChildren } from 'react';

export enum ModalInputType {
  TextInput,
  NumberInput,
  TextArea,
};

type ModalInputProps = {
  type?: ModalInputType,
  label: string,
  defaultValue: string | number,
  onChange: Function,
  size?: number,
  rows?: number,
  cols?: number,
};
export const ModalInput = ({ type, label, defaultValue, onChange, size, rows, cols }: ModalInputProps) => (
  <>
    <label htmlFor={`${label}_input`}>
      {label}
    </label>
    {type === ModalInputType.TextArea ? (
      <textarea
        id={`${label}_input`}
        defaultValue={defaultValue}
        onChange={({ target: { value }}) => { onChange(value); }}
        rows={rows}
        cols={cols}
      />
    ) : (
      <input
        id={`${label}_input`}
        type={type === ModalInputType.NumberInput ? 'number' : 'text'}
        defaultValue={defaultValue}
        onChange={({ target: { value }}) => {
          onChange(type === ModalInputType.NumberInput ? Number(value) : value);
        }}
        size={size}
        min={1}
      />
    )}
  </>
);

type ModalProps = {
  title: string,
  onSubmit: Function,
  onClose: Function,
  isFormValid?: boolean,
};
const Modal = ({ title, onSubmit, onClose, isFormValid, children }: PropsWithChildren<ModalProps>) => (
  <div className="modal-background">
    <div className="modal">
      <h1>{title}</h1>
      <form onSubmit={(e) => { onSubmit(); e.preventDefault(); }}>
        {children}
        <div className="modal-form-buttons">
          <button type="submit" disabled={isFormValid === false} >✔️ Enregistrer</button>
          <button onClick={() => { onClose(); }}>❌ Annuler</button>
        </div>
      </form>
    </div>
  </div>
);

export default Modal;
