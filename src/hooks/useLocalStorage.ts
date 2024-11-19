import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      const parsedItem = item ? JSON.parse(item) : initialValue;

      if (JSON.stringify(parsedItem) !== JSON.stringify(storedValue)) {
        setStoredValue(parsedItem);
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
  }, [initialValue, key, storedValue]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
