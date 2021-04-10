import { useEffect, useState } from "react";
import { defaultServiceProvisions } from "./localStorage.default";

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
