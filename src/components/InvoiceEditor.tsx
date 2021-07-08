import { ServiceProvision, useInvoice, usePersonalInfo } from "../hooks";
import { formatCurrency } from "../utils";
import ServiceProvisions from "./ServiceProvisions";
import InvoiceHeader from "./InvoiceHeader";

const DEFAULT_SERVICE_PROVISION = {
  heading: "Titre",
  details: "Détails",
  hours: 1,
};

type InvoiceEditorProps = {
  invoiceId: number,
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
  const totalAmount = serviceProvisions.reduce(
    (total: number, { hours }) => total + hours * rate,
    0
  );

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
            onChange={(newServiceProvisions: Array<ServiceProvision>) =>
              updateInvoice({
                ...invoice,
                serviceProvisions: newServiceProvisions,
              })
            }
          />
        </tbody>
      </table>
      <button
        className="no-print"
        onClick={() => {
          updateInvoice({
            ...invoice,
            serviceProvisions: [...serviceProvisions, DEFAULT_SERVICE_PROVISION],
          });
        }}
      >
        Nouvelle ligne
      </button>
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
