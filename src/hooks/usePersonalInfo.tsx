import { useEffect, useState } from 'react';
import { PersonalInfo } from '../types';
import { getValueFromStorage, setValueInStorage } from '../utils';

export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();

  useEffect(() => {
    const data = getValueFromStorage('personalInfo');

    if (data) {
      setPersonalInfo(data);
    } else {
      setValueInStorage('personalInfo', {
        name: 'Prénom NOM',
        personalDetails: 'Titre\nCertification',
        contactInfo: 'Tél. 06 12 34 56 78\nEmail : email@example.com',
        siret: 'SIRET',
      });
    }
  }, []);

  const updatePersonalInfo = (newInfo: PersonalInfo) => {
    setValueInStorage('personalInfo', newInfo);
    setPersonalInfo(newInfo);
  };

  return [personalInfo, updatePersonalInfo] as const;
};
