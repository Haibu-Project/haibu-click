import { useState } from "react";

type FormState<T> = {
  [K in keyof T]: T[K];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFormSetter = <T extends Record<string, any>>(initialState: T) => {
  const [formState, setFormState] = useState<FormState<T>>(initialState);

  const createFormSetter = (fieldName: keyof T) => {
    return (fieldValue: T[typeof fieldName]) => {
      setFormState((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    };
  };

  return [formState, createFormSetter] as const;
};

export default useFormSetter;
