import { ChangeEvent, useState } from "react";

type UseInputHook = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (e: ChangeEvent<HTMLInputElement>) => void
];

const useInput = (value: string=''): UseInputHook => {
  const [inputValue, setInputValue] = useState<string>(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;

    setInputValue(targetValue);
  };

  return [inputValue, setInputValue, handleInputChange];
};

export default useInput;
