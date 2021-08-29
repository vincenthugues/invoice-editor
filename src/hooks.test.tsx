import { render, RenderOptions } from "@testing-library/react";
import { usePersonalInfo } from "./hooks";
import * as utils from './utils';

jest.mock('./utils');

let processEnv: NodeJS.ProcessEnv;

describe('usePersonalInfo', () => {
  const DEFAULT_PERSONAL_INFO = {
    name: 'Name',
    personalDetails: 'Personal Details',
    contactInfo: 'Contact Info',
    siret: 'Siret',
  };

  const TestComponent = () => {
    const [personalInfo, setPersonalInfo] = usePersonalInfo();

    return <span>Personal info: {JSON.stringify(personalInfo)}</span>;
  };

  let container: Element | null;

  beforeAll(() => {
    processEnv = process.env;
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    utils.getValueFromStorage = jest.fn();
    utils.setValueInStorage = jest.fn();
  });

  afterEach(() => {
    process.env = processEnv;

    document.body.removeChild(container as Element);
    container = null;
  });

  it('sets default values in storage when no value exists', () => {
    process.env = {
      ...process.env,
      REACT_APP_NAME: DEFAULT_PERSONAL_INFO.name,
      REACT_APP_PERSONAL_DETAILS: DEFAULT_PERSONAL_INFO.personalDetails,
      REACT_APP_CONTACT_INFO: DEFAULT_PERSONAL_INFO.contactInfo,
      REACT_APP_SIRET: DEFAULT_PERSONAL_INFO.siret,
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
