import { render, RenderOptions } from "@testing-library/react";
import { usePersonalInfo } from "./hooks";
import * as utils from './utils';

jest.mock('./utils');

let processEnv: NodeJS.ProcessEnv;

describe('usePersonalInfo', () => {
  const TestComponent = () => {
    const [personalInfo, setPersonalInfo] = usePersonalInfo();

    return <span>Personal info: {JSON.stringify(personalInfo)}</span>;
  };

  let container: Element | null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    utils.getValueFromStorage = jest.fn();
    utils.setValueInStorage = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(container as Element);
    container = null;
  });

  it('sets default values in storage when no value exists', () => {
    const DEFAULT_PERSONAL_INFO = {
      name: 'Prénom NOM',
      personalDetails: 'Titre\nCertification',
      contactInfo: 'Tél. 06 12 34 56 78\nEmail : email@example.com',
      siret: 'SIRET',
    };

    render(<TestComponent />, container as RenderOptions);

    expect(utils.getValueFromStorage).toHaveBeenCalledTimes(1);
    expect(utils.setValueInStorage).toHaveBeenCalledTimes(1);
    expect(utils.setValueInStorage).toHaveBeenCalledWith('personalInfo', DEFAULT_PERSONAL_INFO);
  });

  it('gets stored values', () => {
    const storedValues = {
      name: 'name2',
      personalDetails: 'personalDetails2',
      contactInfo: 'contactInfo2',
      siret: 'siret2',
    };

    utils.getValueFromStorage = jest.fn().mockReturnValueOnce(storedValues);

    render(<TestComponent />, container as RenderOptions);

    expect(utils.getValueFromStorage).toHaveBeenCalledTimes(1);
    expect(utils.setValueInStorage).toHaveBeenCalledTimes(0);
  });
});
