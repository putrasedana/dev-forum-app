import { useState, ChangeEvent } from "react";

function useInput(
  defaultValue = "",
): [
  string,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<string>>,
] {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  return [value, handleValueChange, setValue];
}

export default useInput;
