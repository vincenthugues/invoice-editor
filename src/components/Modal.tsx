import { PropsWithChildren } from 'react';

export enum ModalInputType {
  Input,
  TextArea,
}

type ModalInputProps = {
  type?: ModalInputType,
  label: string,
  defaultValue: string,
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
        defaultValue={defaultValue}
        onChange={({ target: { value }}) => { onChange(value); }}
        size={size}
      />
    )}
  </>
);

type ModalProps = {
  title: string,
  onSubmit: Function,
  onClose: Function,
};
const Modal = ({ title, onSubmit, onClose, children }: PropsWithChildren<ModalProps>) => (
  <div className="modal-background">
    <div className="modal">
      <h1>{title}</h1>
      <form onSubmit={(e) => { onSubmit(); e.preventDefault(); }}>
        {children}
        <div className="form-buttons">
          <button type="submit">✔️ Enregistrer</button>
          <button onClick={() => { onClose(); }}>❌ Annuler</button>
        </div>
      </form>
    </div>
  </div>
);

export default Modal;
