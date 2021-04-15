import { formatCurrency } from "../utils";
import EditableText from "./EditableText";

const rate = Number(process.env.REACT_APP_RATE);

const ServiceProvision = ({ heading, details, hours, fieldUpdater }) => (
  <tr>
    <td>
      <b>
        <EditableText value={heading} onChange={fieldUpdater("heading")} />
      </b>
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
  </tr>
);

const ServiceProvisions = ({ serviceProvisions, onChange }) => (
  <>
    {serviceProvisions.map(({ heading, details, hours }, index) => (
      <ServiceProvision
        key={index}
        heading={heading}
        details={details}
        hours={hours}
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
      />
    ))}
  </>
);

export default ServiceProvisions;
