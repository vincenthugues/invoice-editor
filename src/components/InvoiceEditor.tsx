import { sum } from 'lodash';
import { usePersonalInfo, useInvoice } from '../hooks';
import { ServiceProvision } from '../types';
import { formatCurrency } from '../utils';
import InvoiceHeader from './InvoiceHeader';
import ServiceProvisionCreator from './ServiceProvisionCreator';
import ServiceProvisions from './ServiceProvisions';

type InvoiceEditorProps = {
  invoiceId: number;
};
const InvoiceEditor = ({ invoiceId }: InvoiceEditorProps) => {
  const [personalInfo] = usePersonalInfo();
  const [invoice, updateInvoice] = useInvoice(invoiceId);
  const tva = 0;

  if (!personalInfo || !invoice) return null;

  const { siret } = personalInfo;
  const {
    number: invoiceNumber,
    date,
    clientName,
    patientName,
    rate,
    serviceProvisions,
  } = invoice;
  const totalAmount = sum(serviceProvisions.map(({ hours }) => hours * rate));

  return (
    <div className="Invoice">
      <InvoiceHeader
        invoiceNumber={invoiceNumber}
        date={date}
        clientName={clientName}
        patientName={patientName}
      />
      <table>
        <thead>
          <tr>
            <td>Service</td>
            <td>Nombre d’heures</td>
            <td>Taux horaire</td>
            <td>Total HT</td>
            <td className="LastColumn no-print" />
          </tr>
        </thead>
        <tbody>
          <ServiceProvisions
            serviceProvisions={serviceProvisions}
            rate={rate}
            onChange={(updatedServiceProvisions: ServiceProvision[]) => {
              updateInvoice({
                ...invoice,
                serviceProvisions: updatedServiceProvisions,
              });
            }}
          />
        </tbody>
      </table>
      <ServiceProvisionCreator
        serviceProvisions={serviceProvisions}
        onCreate={(newServiceProvision: ServiceProvision) => {
          updateInvoice({
            ...invoice,
            serviceProvisions: [
              ...invoice.serviceProvisions,
              newServiceProvision,
            ],
          });
        }}
      />
      <div className="AlignRight">
        <div>
          <b>Total brut</b>
          <br />
          {formatCurrency(totalAmount)}
        </div>
        <div>
          <b>TVA</b>
          <br />
          {formatCurrency(tva)}
        </div>
        <div>
          <b>Total NET à payer</b>
          <br />
          {formatCurrency(totalAmount + tva)}
        </div>
      </div>
      <div>
        <div>TVA non applicable, art. 293 B du CGI</div>
        <hr />
        <div>
          № Siret {siret} - Facture {invoiceNumber}
        </div>
      </div>
    </div>
  );
};

export default InvoiceEditor;
