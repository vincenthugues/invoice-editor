import { useState } from "react";

const EditableText = ({ value: defaultValue, onChange, field }) => {
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const onConfirm = () => {
    onChange(value);
    setIsEditing(false);
  };
  const onCancel = () => {
    setValue(defaultValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        onChange={({ target }) => setValue(target.value)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="EditableContainer"
      >
        {field === "textarea" ? (
          <textarea defaultValue={value} className="EditableField" />
        ) : (
          <input
            type={field === "number" ? "number" : "text"}
            defaultValue={value}
            className="EditableField"
          />
        )}
        <div className="EditableButtons">
          <button type="button" onClick={onConfirm}>
            Confirmer
          </button>
          <button type="button" onClick={onCancel}>
            Annuler
          </button>
        </div>
      </form>
    );
  }

  return <div onClick={() => setIsEditing(true)}>{value}</div>;
};

export default EditableText;
