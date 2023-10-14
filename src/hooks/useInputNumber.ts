import { ChangeEvent, useState } from "react";

type UseInputNumberHook = [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  (e: ChangeEvent<HTMLInputElement>) => void
];

const useInputNumber = (value: number = 0): UseInputNumberHook => {
  const [inputValue, setInputValue] = useState<number>(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = parseInt(e.target.value, 10) || 0;
    setInputValue(targetValue);
  };

  return [inputValue, setInputValue, handleInputChange];
};

export default useInputNumber;
