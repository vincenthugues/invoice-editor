import { ServiceProvision } from "../hooks";
import { formatCurrency } from "../utils";
import EditableField, { FieldType } from "./EditableText";

type ServiceProvisionRowProps = {
  heading: string,
  details: string,
  hours: number,
  rate: number,
  fieldUpdater: Function,
  onDelete: Function,
};
const ServiceProvisionRow = ({
  heading,
  details,
  hours,
  rate,
  fieldUpdater,
  onDelete,
}: ServiceProvisionRowProps) => (
  <tr>
    <td>
      <b>
        <EditableField value={heading} onChange={fieldUpdater("heading")} />
      </b>
      <br />
      <EditableField
        value={details}
        onChange={fieldUpdater("details")}
        fieldType={FieldType.TextArea}
      />
    </td>
    <td>
      <div className="CellRow">
        <EditableField
          value={String(hours)}
          onChange={fieldUpdater("hours")}
          fieldType={FieldType.Hours}
        />
      </div>
    </td>
    <td align="center">{formatCurrency(rate)}</td>
    <td align="center">{formatCurrency(hours * rate)}</td>
    <td className="LastColumn no-print">
      <button
        onClick={() => {
          if (window.confirm("Supprimer la ligne ?")) onDelete();
        }}
      >
        ❌
      </button>
    </td>
  </tr>
);

type ServiceProvisionsProps = {
  serviceProvisions: Array<ServiceProvision>,
  rate: number,
  onChange: Function,
};
const ServiceProvisions = ({ serviceProvisions, onChange, rate }: ServiceProvisionsProps) => (
  <>
    {serviceProvisions.map(({ heading, details, hours }, index) => (
      <ServiceProvisionRow
        key={index}
        heading={heading}
        details={details}
        hours={hours}
        rate={rate}
        fieldUpdater={(fieldName: string) => (value: string | number) => {
          onChange([
            ...serviceProvisions.slice(0, index),
            {
              ...serviceProvisions[index],
              [fieldName]: value,
            },
            ...serviceProvisions.slice(index + 1),
          ]);
        }}
        onDelete={() =>
          onChange([
            ...serviceProvisions.slice(0, index),
            ...serviceProvisions.slice(index + 1),
          ])
        }
      />
    ))}
  </>
);

export default ServiceProvisions;
