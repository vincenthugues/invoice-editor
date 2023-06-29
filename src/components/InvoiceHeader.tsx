import { usePersonalInfo } from '../hooks';
import { addDaysToDate } from '../utils';

type InvoiceHeaderProps = {
  invoiceNumber: number;
  date: Date;
  clientName: string;
  patientName: string;
};
const InvoiceHeader = ({
  invoiceNumber,
  date,
  clientName,
  patientName,
}: InvoiceHeaderProps) => {
  const [personalInfo] = usePersonalInfo();

  if (!personalInfo) return null;

  const { name, personalDetails, contactInfo } = personalInfo;
  const invoiceDate = new Date(date);
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
          <b>Date :</b> {invoiceDate.toLocaleDateString('fr-FR')}
        </div>
        <div>
          <b>Echéance :</b> {deadline.toLocaleDateString('fr-FR')}
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

export default InvoiceHeader;
