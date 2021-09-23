import { reject } from 'lodash';
import { ServiceProvision } from '../hooks';
import { formatCurrency } from '../utils';
import ServiceProvisionEditor from './ServiceProvisionEditor';

type ServiceProvisionRowProps = {
  serviceProvision: ServiceProvision,
  rate: number,
  onChange: Function,
  onDelete: Function,
};
const ServiceProvisionRow = ({
  serviceProvision,
  rate,
  onChange,
  onDelete,
}: ServiceProvisionRowProps) => (
  <tr>
    <td>
      <b>{serviceProvision.heading}</b>
      <br />
      {serviceProvision.details}
    </td>
    <td>
      <div className="CellRow">
        {serviceProvision.hours}
      </div>
    </td>
    <td align="center">{formatCurrency(rate)}</td>
    <td align="center">{formatCurrency(serviceProvision.hours * rate)}</td>
    <td className="LastColumn no-print">
      <ServiceProvisionEditor
        serviceProvision={serviceProvision}
        onSave={onChange}
      />
      <button
        onClick={() => {
          if (window.confirm('Supprimer la ligne ?')) {
            onDelete();
          }
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
    {serviceProvisions.map((serviceProvision) => (
      <ServiceProvisionRow
        key={serviceProvision.id}
        serviceProvision={serviceProvision}
        rate={rate}
        onChange={(updatedServiceProvision: ServiceProvision) => {
          onChange(serviceProvisions.map((row) =>
            row.id === serviceProvision.id
              ? { ...updatedServiceProvision, id: serviceProvision.id }
              : row
          ));
        }}
        onDelete={() => {
          onChange(reject(serviceProvisions, { id: serviceProvision.id }));
        }}
      />
    ))}
  </>
);

export default ServiceProvisions;
