"use client";
import { useState } from "react";

import CreatableSelect from "react-select/creatable";

const CustomDropDown = ({
  options,
  setValue,
  setOptions = () => {},
  value,
  name,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOptions({  familyName: inputValue });
    }, 1000);
  };

  const handleSelectChange = (selectedOption) => {
    // Pass both the name and the selected value to the setValue function
    setValue({ id: name, value: selectedOption });
  };

  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => handleSelectChange(newValue.value)}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  );
};

export default CustomDropDown;
