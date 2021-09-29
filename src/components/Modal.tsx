import { PropsWithChildren } from 'react';

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
