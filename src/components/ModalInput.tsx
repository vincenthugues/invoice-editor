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
  min?: number,
  step?: number,
};
const ModalInput = ({ type, label, defaultValue, onChange, size, rows, cols, min, step }: ModalInputProps) => (
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
        min={min ?? 1}
        step={step}
      />
    )}
  </>
);

export default ModalInput;
