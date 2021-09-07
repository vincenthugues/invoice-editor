import { render, screen } from "@testing-library/react";
import { usePersonalInfo } from "./hooks";
import { getValueFromStorage, setValueInStorage } from './utils';

jest.mock('./utils');

describe('usePersonalInfo', () => {
  const TestComponent = () => {
    const [personalInfo, setPersonalInfo] = usePersonalInfo();
    const { name, personalDetails, contactInfo, siret } = personalInfo || {};

    return <div>{name}{personalDetails}{contactInfo}{siret}</div>;
  };

  it('sets default values in storage when no value exists', () => {
    const DEFAULT_PERSONAL_INFO = {
      name: 'Prénom NOM',
      personalDetails: 'Titre\nCertification',
      contactInfo: 'Tél. 06 12 34 56 78\nEmail : email@example.com',
      siret: 'SIRET',
    };

    render(<TestComponent />);

    expect(getValueFromStorage).toHaveBeenCalledTimes(1);
    expect(setValueInStorage).toHaveBeenCalledTimes(1);
    expect(setValueInStorage).toHaveBeenCalledWith('personalInfo', DEFAULT_PERSONAL_INFO);
  });

  it('gets stored values', () => {
    const storedValues = {
      name: 'TEST_NAME',
      personalDetails: 'TEST_PERSONAL_DETAILS',
      contactInfo: 'TEST_CONTACT_INFO',
      siret: 'TEST_SIRET',
    };

    (getValueFromStorage as jest.Mock).mockReturnValueOnce(storedValues);

    render(<TestComponent />);

    expect(getValueFromStorage).toHaveBeenCalledTimes(1);
    expect(setValueInStorage).toHaveBeenCalledTimes(0);

    expect(screen.getByText(/TEST_NAME/)).toBeInTheDocument();
    expect(screen.getByText(/TEST_PERSONAL_DETAILS/)).toBeInTheDocument();
    expect(screen.getByText(/TEST_CONTACT_INFO/)).toBeInTheDocument();
    expect(screen.getByText(/TEST_SIRET/)).toBeInTheDocument();
  });
});
