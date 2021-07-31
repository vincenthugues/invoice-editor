import { useState } from "react";

export enum FieldType {
  Text,
  TextArea,
  Hours,
};

type EditableTextProps = {
  value: string,
  onChange: Function,
  fieldType?: FieldType,
}
const EditableField = ({ value: defaultValue, onChange, fieldType }: EditableTextProps) => {
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

  const buildField = (fieldType?: FieldType) => {
    switch (fieldType) {
      case FieldType.TextArea:
        return (
          <textarea defaultValue={value} className="EditableField" />
        );
      case FieldType.Hours:
        return (
          <input
            type="number"
            defaultValue={value}
            className="EditableField"
          />
        );
      case FieldType.Text:
      default:
        return (
          <input
            type="text"
            defaultValue={value}
            className="EditableField"
          />
        );
    }
  }

  if (isEditing) {
    return (
      <form
        onChange={({ target }) => setValue((target as HTMLInputElement).value)}
        onSubmit={(e) => { e.preventDefault(); }}
        className="EditableContainer"
      >
        {buildField(fieldType)}
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

  const formatHours = (valueStr: String) => {
    const value = Number(valueStr);
    const hours = Math.floor(value);
    const minutes = (value - hours) * 60;
    return `${hours}h${minutes ? minutes : ''}`;
  };
  return (
    <div onClick={() => setIsEditing(true)}>
      {fieldType === FieldType.Hours ? formatHours(value) : value}
    </div>
  );
};

export default EditableField;
