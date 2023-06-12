export const getValueFromStorage = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

export const setValueInStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
