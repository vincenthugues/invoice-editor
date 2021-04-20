import { useEffect, useState } from "react";
import { defaultServiceProvisions } from "./localStorage.default";

export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("personalInfo");

    if (storedData) {
      setPersonalInfo(JSON.parse(storedData));
    } else {
      const {
        REACT_APP_NAME: name,
        REACT_APP_PERSONAL_DETAILS: personalDetails,
        REACT_APP_CONTACT_INFO: contactInfo,
        REACT_APP_SIRET: siret,
      } = process.env;

      localStorage.setItem(
        "personalInfo",
        JSON.stringify({
          name,
          personalDetails,
          contactInfo,
          siret,
        })
      );
    }
  }, []);

  return [personalInfo, setPersonalInfo];
};

const defaultInvoices = [
  {
    id: 1,
    number: "20201043",
    date: new Date("2021-01-01"),
    clientName: process.env.REACT_APP_CLIENT,
    patientName: process.env.REACT_APP_PATIENT,
    rate: Number(process.env.REACT_APP_RATE),
    serviceProvisions: defaultServiceProvisions,
  },
];
export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("invoices");

    if (storedData) {
      setInvoices(JSON.parse(storedData));
    } else {
      localStorage.setItem("invoices", JSON.stringify(defaultInvoices));
    }
  }, []);

  const createInvoice = (newInvoice) => {
    const maxId = invoices.reduce((max, { id }) => (id > max ? id : max), 0);
    const updatedInvoices = [
      ...invoices,
      {
        ...newInvoice,
        id: maxId + 1,
        date: new Date(),
        serviceProvisions: [],
      },
    ];
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    setInvoices(updatedInvoices);
  };

  return [invoices, createInvoice];
};

export const useInvoice = (invoiceId) => {
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("invoices");
    const storedInvoice =
      storedData && JSON.parse(storedData).find(({ id }) => id === invoiceId);

    setInvoice(storedInvoice);
  }, [invoiceId]);

  const updateInvoice = (newInvoice) => {
    const storedData = localStorage.getItem("invoices");
    const storedInvoices = storedData && JSON.parse(storedData);
    const updatedInvoices = storedInvoices.map((v) =>
      v.id === invoiceId ? newInvoice : v
    );
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

    setInvoice(newInvoice);
  };

  return [invoice, updateInvoice];
};
