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

export const useServiceProvisions = () => {
  const [serviceProvisions, setServiceProvisions] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("serviceProvisions");

    if (storedData) {
      setServiceProvisions(JSON.parse(storedData));
    } else {
      localStorage.setItem(
        "serviceProvisions",
        JSON.stringify(defaultServiceProvisions)
      );
    }
  }, []);

  return [serviceProvisions, setServiceProvisions];
};
