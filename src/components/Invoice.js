import { usePersonalInfo, useServiceProvisions } from "../hooks";
import { addDaysToDate, formatCurrency } from "../utils";
import ServiceProvisions from "./ServiceProvisions";

const {
  REACT_APP_CLIENT: clientName,
  REACT_APP_PATIENT: patientName,
} = process.env;

const InvoiceHeader = ({ invoiceNumber }) => {
  const [{ name, personalDetails, contactInfo }] = usePersonalInfo();
  const invoiceDate = new Date();
  const deadline = addDaysToDate(invoiceDate, 30);

  return (
    <div className="InvoiceRow">
      <div className="InvoiceRowBlock" align="left">
        <b>{name}</b>
        <br />
        {personalDetails}
        <br />
        <br />
        {contactInfo}
      </div>
      <div className="InvoiceRowBlock" align="right">
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

const Invoice = () => {
  const [{ siret }] = usePersonalInfo();
  const rate = Number(process.env.REACT_APP_RATE);
  const tva = 0;
  const invoiceNumber = "20201043";
  const [serviceProvisions] = useServiceProvisions();
  const totalAmount = serviceProvisions.reduce(
    (total, { hours }) => total + hours * rate,
    0
  );

  return (
    <div className="Invoice">
      <InvoiceHeader invoiceNumber={invoiceNumber} />
      <table>
        <thead>
          <tr>
            <td>Service</td>
            <td>Nombre d’heures</td>
            <td>Taux horaire</td>
            <td>Total HT</td>
          </tr>
        </thead>
        <tbody>
          <ServiceProvisions />
        </tbody>
      </table>
      <div align="right">
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
      <div>TVA non applicable, art. 293 B du CGI</div>
      <hr />
      <div>
        № Siret {siret} - Facture {invoiceNumber}
      </div>
    </div>
  );
};

export default Invoice;
