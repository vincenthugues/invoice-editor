import { formatCurrency } from "../utils";
import EditableText from "./EditableText";

const ServiceProvision = ({
  heading,
  details,
  hours,
  rate,
  fieldUpdater,
  onDelete,
}) => (
  <tr>
    <td>
      <b>
        <EditableText value={heading} onChange={fieldUpdater("heading")} />
      </b>
      <br />
      <EditableText
        value={details}
        onChange={fieldUpdater("details")}
        field="textarea"
      />
    </td>
    <td>
      <div className="CellRow">
        <EditableText
          value={hours}
          onChange={fieldUpdater("hours")}
          field="number"
        />
        h
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

const ServiceProvisions = ({ serviceProvisions, onChange, rate }) => (
  <>
    {serviceProvisions.map(({ heading, details, hours }, index) => (
      <ServiceProvision
        key={index}
        heading={heading}
        details={details}
        hours={hours}
        rate={rate}
        fieldUpdater={(fieldName) => (value) => {
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
