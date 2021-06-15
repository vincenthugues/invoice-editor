import { ServiceProvision, useInvoice, usePersonalInfo } from "../hooks";
import { addDaysToDate, formatCurrency } from "../utils";
import ServiceProvisions from "./ServiceProvisions";

type InvoiceHeaderProps = {
  invoiceNumber: number,
  clientName: string,
  patientName: string,
};
const InvoiceHeader = ({ invoiceNumber, clientName, patientName }: InvoiceHeaderProps) => {
  const [{ name, personalDetails, contactInfo }] = usePersonalInfo();
  const invoiceDate = new Date();
  const deadline = addDaysToDate(invoiceDate, 30);

  return (
    <div className="InvoiceRow">
      <div className="InvoiceRowBlock AlignLeft">
        <b>{name}</b>
        <br />
        {personalDetails}
        <br />
        <br />
        {contactInfo}
      </div>
      <div className="InvoiceRowBlock AlignRight">
        <div>
          <b>Facture</b> {invoiceNumber}
        </div>
        <br />
        <div>
          <b>Date :</b> {invoiceDate.toLocaleDateString("fr-FR")}
        </div>
        <div>
          <b>Echéance :</b> {deadline.toLocaleDateString("fr-FR")}
        </div>
        <br />
        <div>
          <b>Destinataire</b>
          <br />
          {clientName}
        </div>
        <br />
        <div>
          <b>Patient</b>
          <br />
          {patientName}
        </div>
      </div>
    </div>
  );
};

type InvoiceEditorProps = {
  invoiceId: number,
};
const InvoiceEditor = ({ invoiceId }: InvoiceEditorProps) => {
  const [{ siret }] = usePersonalInfo();
  const [invoice, updateInvoice] = useInvoice(invoiceId);
  const {
    number: invoiceNumber,
    clientName,
    patientName,
    rate = 0,
    serviceProvisions = [],
  } = invoice;
  const tva = 0;
  const totalAmount = serviceProvisions.reduce(
    (total: number, { hours }) => total + hours * rate,
    0
  );

  return (
    <div className="Invoice">
      <InvoiceHeader
        invoiceNumber={invoiceNumber || 0}
        clientName={clientName || ''}
        patientName={patientName || ''}
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
          {serviceProvisions && (
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
          )}
        </tbody>
      </table>
      <button
        className="no-print"
        onClick={() => {
          updateInvoice({
            ...invoice,
            serviceProvisions: [
              ...serviceProvisions,
              {
                heading: "Titre",
                details: "Détails",
                hours: 1,
              },
            ],
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
