import { ChangeEvent, useState } from "react";

type UseInputHook<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
  (e: ChangeEvent<HTMLInputElement>) => void
];

const useInput = <T>(value: T): UseInputHook<T> => {
  const [inputValue, setInputValue] = useState<T>(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;

    setInputValue((targetValue as unknown) as T);
  };

  return [inputValue, setInputValue, handleInputChange];
};

export default useInput;
